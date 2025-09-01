import { Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateActivityDto } from './dtos';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(user: User) {
    try {
      return this.prisma.activity.findMany({
        where: { user_id: user.id },
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
