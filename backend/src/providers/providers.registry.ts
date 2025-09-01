import { ConfigService } from "@nestjs/config";
import { IntegrationAdapter, IntegrationProvider } from "../integrations/integrations.types";
import { StravaAdapter } from "./strava/strava.adapter";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ProvidersRegistry {
  private readonly registry: Record<IntegrationProvider, IntegrationAdapter>

  constructor(private readonly config: ConfigService) {
    this.registry = {
      [IntegrationProvider.STRAVA]: new StravaAdapter(config),
    }
  }

  get(provider: string): IntegrationAdapter | undefined {
    const adapter = this.registry[provider];
    if (!adapter) {
      throw new NotFoundException(`Integration ${provider} not found`);
    }
    return adapter;
  }
}