import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectsService } from './projects.service';
import { GetUser } from '../auth/decorators/get-user-decorator';
import { User } from '@prisma/client';
import { CreateProjectDto } from './dtos/create-project.dto';
import { getProject } from './decorators/get-project.decorator';
import { ProjectGuard } from './guards/project.guard';
import { RessourceGuard } from './guards/ressource.guard';
import { ProjectWithSettings } from '../prisma/types/project-with-settings.type';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async createProject(@GetUser() user: User, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(user, dto);
  }

  @Post(':projectId/sync-schema')
  @UseGuards(ProjectGuard)
  async syncSchema(@getProject() project: ProjectWithSettings) {
    return this.projectsService.syncSchema(project);
  }

  @Get(':projectId/ressources/:ressourceName')
  @UseGuards(ProjectGuard, RessourceGuard)
  async getRessource(
    @getProject() project: ProjectWithSettings,
    @Param('ressourceName') ressourceName: string,
  ) {
    return this.projectsService.getRessource(project, ressourceName);
  }

  @Post(':projectId/ressources/:ressourceName')
  @UseGuards(ProjectGuard, RessourceGuard)
  async createRessource(
    @getProject() project: ProjectWithSettings,
    @Param('ressourceName') ressourceName: string,
    @Body() data: object,
  ) {
    return this.projectsService.createRessource(project, ressourceName, data);
  }

  @Delete(':projectId/ressources/:ressourceName/:id')
  @UseGuards(ProjectGuard, RessourceGuard)
  async deleteRessource(
    @getProject() project: ProjectWithSettings,
    @Param('ressourceName') ressourceName: string,
    @Param('id') ressourceId: string,
    @Query('primaryKey') primaryKey: string,
  ) {
    return this.projectsService.deleteRessource(
      project,
      ressourceName,
      ressourceId,
      primaryKey,
    );
  }
}
