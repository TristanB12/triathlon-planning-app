import { OnGlobalQueueFailed, OnQueueActive, OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import { ActivitiesService } from "./activities.service";
import { Job } from "bull";
import { User } from "@prisma/client";
import { TrainingPlanSchemaType } from '../openai/schemas/training-plan.schema';
import { CreateActivityDto } from "./dtos";
import { Logger } from "@nestjs/common";

@Processor('activities')
export class ActivitiesProcessor {
  constructor(private readonly activitiesService: ActivitiesService) {}

  private readonly logger = new Logger(ActivitiesProcessor.name);

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing job ${job.name} with data ${JSON.stringify(job.data)}`);
  }

  @OnGlobalQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.error(`Failed job ${job.name}: ${error}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.log(`Completed job ${job.name} with data ${JSON.stringify(job.data)}`);
  }

  @Process('create-from-ai-output')
  async createActivitiesFromAIOutput(job: Job<{ data: TrainingPlanSchemaType, user: User }>) {
    const { user, data } = job.data;

    data.activities.forEach(async (activity) => {
      const dto: CreateActivityDto = {
        name: activity.name,
        description: activity.description,
        sport_type: activity.sport_type,
        planned_on: new Date(activity.planned_on).toISOString(),
        estimated_duration: activity.duration,
        distance: activity.distance,
      };

      await this.activitiesService.create(user, dto);
    });
  }
}
