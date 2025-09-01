import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGoalDto } from './dtos/create-goal.dto';
import { OpenaiService } from '../openai/openai.service';
import { UserWithExtensions } from '../prisma/types/user-with-extensions';
import { PromptPayload } from '../openai/types';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { User } from '@prisma/client';
import { UpdateGoalDto } from './dtos/update-goal-dto';

@Injectable()
export class GoalsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly openai: OpenaiService,
    @InjectQueue('activities') private activitiesQueue: Queue
  ) {}

  async findAllFromUser(user: User) {
    const goals = await this.prisma.goal.findMany({
      where: {
        user_id: user.id
      },
      orderBy: {
        current: 'desc'
      }
    });
    return goals;
  }

  async findOneFromUser(id: number, user: User) {
    const goal = await this.prisma.goal.findFirst({
      where: {
        id,
        user_id: user.id
      }
    });

    if (!goal) throw new NotFoundException('Goal not found');
    return goal;
  }

  async create(user: UserWithExtensions, dto: CreateGoalDto) {
    try {
      const promptVariables: PromptPayload = {
        age: user.age.toString(),
        goal: dto.distance_type,
        goal_date: dto.end_at,
        run_level: user.run_level,
        bike_level: user.bike_level,
        swim_level: user.swim_level,
        number_days_available_per_week: user.number_days_available_per_week.toString(),
      }
      const input = "Create plan for weeks 1-4";
      const prompt = await this.openai.createResponse(promptVariables, input);
      const goal = await this.prisma.goal.create({
        data: {
          ...dto,
          user_id: user.id,
          ai_response_id: prompt.id,
        }
      });

      this.activitiesQueue.add('create-from-ai-output', {
        data: prompt.output_parsed,
        user: user
      });

      return goal;
    } catch (error) {
      throw new InternalServerErrorException(`Error creating goal: ${error.message}`);
    }
  }

  async updateOne(id: number, user: User, dto: UpdateGoalDto) {
    return await this.prisma.goal.update({
      where: {
        id,
        user_id: user.id
      },
      data: {
        ...dto
      }
    });
  }
}
