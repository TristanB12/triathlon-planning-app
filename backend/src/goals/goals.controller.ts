import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user-decorator';
import { User } from '@prisma/client';
import { CreateGoalDto } from './dtos/create-goal.dto';
import { UserWithExtensions } from '../prisma/types/user-with-extensions';
import { UpdateGoalDto } from './dtos/update-goal-dto';

@UseGuards(JwtAuthGuard)
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  getGoals(@GetUser() user: User) {
    return this.goalsService.findAllFromUser(user);
  }

  @Get(':id')
  getGoal(@Param('id') id: number, @GetUser() user: User) {
  return this.goalsService.findOneFromUser(id, user);
  }

  @Post()
  async createGoal(
    @Body() dto: CreateGoalDto,
    @GetUser() user: User,
  ) {
    return this.goalsService.create(user as UserWithExtensions, dto);
  }

  @Put(':id')
  async updateGoal(
    @Param('id') id: number,
    @Body() dto: UpdateGoalDto,
    @GetUser() user: User,
  ) {
    return this.goalsService.updateOne(id, user, dto);
  }
}
