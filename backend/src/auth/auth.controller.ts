import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dtos/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user-decorator';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { RefreshTokenhGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(RefreshTokenhGuard)
  @Get('refresh')
  async refresh(@Request() req) {
    return this.authService.refreshTokens(
      req.user.email,
      req.user.refreshToken,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@GetUser() user: User) {
    return this.usersService.findOne(user.id);
  }
}
