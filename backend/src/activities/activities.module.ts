import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { ActivitiesProcessor } from './activities.processor';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'activities',
    }),
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, ActivitiesProcessor],
  exports: [ActivitiesService]
})
export class ActivitiesModule {}
