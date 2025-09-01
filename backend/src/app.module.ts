import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { ActivitiesModule } from './activities/activities.module';
import { OpenaiModule } from './openai/openai.module';
import { GoalsModule } from './goals/goals.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    IntegrationsModule,
    ActivitiesModule,
    OpenaiModule,
    GoalsModule,
  ],
  providers: [PrismaService, UsersService],
  controllers: [UsersController],
})
export class AppModule {}
