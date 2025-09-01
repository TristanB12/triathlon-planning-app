import { Injectable, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaProvider } from './prisma.provider';


type ExtendedPrisma = ReturnType<PrismaProvider['withExtensions']>;

@Injectable()
export class PrismaService extends (PrismaProvider as unknown as { new (): ExtendedPrisma }) {
  constructor() {
    super();
    Object.assign(this, new PrismaProvider().withExtensions());
  }
}