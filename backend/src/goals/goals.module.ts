import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { OpenaiModule } from '../openai/openai.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [OpenaiModule, BullModule.registerQueue({
    name: 'activities',
  })],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
