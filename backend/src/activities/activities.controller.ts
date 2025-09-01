import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user-decorator';
import { User } from '@prisma/client';
import { CreateActivityDto } from './dtos';

@UseGuards(JwtAuthGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  getAllActivities(@GetUser() user: User) {
    return this.activitiesService.findAll(user);
  }

  @Post()
  createActivity(
    @GetUser() user: User,
    @Body() dto: CreateActivityDto
  ) {
    return this.activitiesService.create(user, dto);
  }
}
