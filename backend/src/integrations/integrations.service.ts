import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { ProvidersRegistry } from "../providers/providers.registry";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CallbackQueryParamsDto } from "./dtos";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class IntegrationsService {
  constructor(
    private readonly providersRegistry: ProvidersRegistry,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async connect(provider: string, user: User) {
    const adapter = this.providersRegistry.get(provider);
    const oauthState = crypto.getRandomValues(new Uint32Array(4)).join('-');

    try {
      await this.prisma.integration.create({
        data: {
          user_id: user.id,
          provider: provider,
          state: oauthState,
        }
      })
      return adapter.getAuthorizationUrl(oauthState);
    } catch (error) {
      throw new Error(`Failed to connect to ${provider}: ${error.message}`);
    }
  }

  async callback(provider: string, query: CallbackQueryParamsDto) {
    const adapter = this.providersRegistry.get(provider);

    try {
      const integration = await this.prisma.integration.findFirstOrThrow({
        where: {
          provider: provider,
          state: query.state,
          active: false,
        }
      });

      const integrationExpiration = integration.created_at.getTime() + 1000 * 60 * 15; // 15min expiration
      if (Date.now() > integrationExpiration) {
        await this.prisma.integration.delete({ where: { id: integration.id } });
        throw new UnauthorizedException("Integration callback has expired");
      }

      const tokens = await adapter.exchangeCodeForToken(query.code);

      await this.prisma.integration.update({
        where: { id: integration.id },
        data: {
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken,
          expires_at: new Date(tokens.expiresAt),
          active: true,
        },
      });

      return this.buildRedirectUrl(provider);
    } catch (error) {

      throw new InternalServerErrorException(`Failed to handle callback for ${provider}: ${error.message}`);
    }
  }

  private buildRedirectUrl(provider: string): string {
    const frontendUrl = this.configService.get<string>("FRONTEND_URL");
    const url = new URL('/integrations', frontendUrl);

    url.searchParams.append("status", "success");
    url.searchParams.append("provider", provider);
    return url.toString();
  }
}