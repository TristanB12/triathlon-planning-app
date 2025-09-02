import { Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateActivityDto } from './dtos';
import { FilteringActivitiesDto } from './dtos/filtering-activities.dto';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(user: User, filtering: FilteringActivitiesDto = {}) {
    const { planned_before, planned_after } = filtering;

    try {
      return this.prisma.activity.findMany({
        where: {
          user_id: user.id,
          ...(planned_after && { planned_on: { gt: new Date(planned_after) } }),
          ...(planned_before && { planned_on: { lt: new Date(planned_before) } }),
        },
      })
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve activities');
    }
  }

  async create(user: User, dto: CreateActivityDto) {
    try {
      return this.prisma.activity.create({
        data: {
          ...dto,
          user_id: user.id,
        },
      });
    } catch (error) {
      throw new UnprocessableEntityException(`Failed to create activity: ${error.message}`);
    }
  }
}
