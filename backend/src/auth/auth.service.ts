import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dtos/register.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(email: string, pass: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (user && (await bcrypt.compare(pass, user.password))) {
        delete user.password;
        return user;
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async login(user: User) {
    const tokens = await this.createTokens(user);
    await this.updateRefreshToken(user, tokens.refresh_token);
    return tokens;
  }

  async register(dto: RegisterDto) {
    try {
      dto.password = this.hashData(dto.password);

      console.log(this.prisma)
      const user = await this.prisma.user.create({ data: dto });
      const tokens = await this.createTokens(user);

      await this.updateRefreshToken(user, tokens.refresh_token);

      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
      }
      throw error;
    }
  }

  async refreshTokens(userEmail: string, refreshToken: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: userEmail },
      });
      if (!user.refresh_token) throw new UnauthorizedException();

      const isRefreshTokenValid = bcrypt.compareSync(
        refreshToken,
        user.refresh_token,
      );

      if (!isRefreshTokenValid) throw new ForbiddenException();

      const tokens = await this.createTokens(user);
      await this.updateRefreshToken(user, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async createTokens(user: User) {
    const FIFTEEN_MINUTES = 1000 * 60 * 15;

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.config.get('JWT_ACCESS_SECRET'),
        expiresIn: '15min',
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
      expires_at: new Date().getTime() + FIFTEEN_MINUTES,
    };
  }

  private async updateRefreshToken(user: User, refreshToken: string) {
    const hashedRefreshToken = this.hashData(refreshToken);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refresh_token: hashedRefreshToken },
    });
  }

  private hashData(data: string) {
    return bcrypt.hashSync(data, 10);
  }
}
