import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user-decorator';
import { User } from '@prisma/client';
import { CreateActivityDto } from './dtos';
import { FilteringActivitiesDto } from './dtos/filtering-activities.dto';

@UseGuards(JwtAuthGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  getAllActivities(
    @GetUser() user: User,
    @Query() filtering: FilteringActivitiesDto
  ) {
    return this.activitiesService.findAll(user, filtering);
  }

  @Post()
  createActivity(
    @GetUser() user: User,
    @Body() dto: CreateActivityDto,
  ) {
    return this.activitiesService.create(user, dto);
  }
}
