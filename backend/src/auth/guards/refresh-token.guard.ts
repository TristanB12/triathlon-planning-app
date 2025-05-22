import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenhGuard extends AuthGuard('jwt-refresh') {}
