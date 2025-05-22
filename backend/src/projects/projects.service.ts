import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateProjectDto } from './dtos/create-project.dto';
import { DatabaseService } from '../database/database.service';
import { ProjectWithSettings } from '../prisma/types/project-with-settings.type';
import { ParsedDatabaseSchema } from '../database/types/parsed-database-interfaces';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(user: User, dto: CreateProjectDto) {
    const databaseService = new DatabaseService(dto.settings);

    try {
      const databaseSchema = await databaseService.getSchema();

      return this.prisma.project.create({
        data: {
          ...dto,
          database_schema: databaseSchema as object,
          settings: {
            create: dto.settings,
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        include: {
          settings: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async syncSchema(project: ProjectWithSettings) {
    try {
      const databaseService = new DatabaseService(project.settings);
      const databaseSchema = await databaseService.getSchema();

      return await this.prisma.project.update({
        where: {
          id: project.id,
        },
        data: {
          database_schema: databaseSchema as object,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getRessource(project: ProjectWithSettings, ressourceName: string) {
    try {
      const databaseService = new DatabaseService(project.settings);

      return databaseService.getRessource(ressourceName);
    } catch (error) {
      throw error;
    }
  }

  async createRessource(
    project: ProjectWithSettings,
    ressourceName: string,
    data: object,
  ) {
    try {
      const databaseService = new DatabaseService(project.settings);
      const databaseSchema =
        project.database_schema.valueOf() as ParsedDatabaseSchema;

      this.validateRessourceArgs(ressourceName, databaseSchema, data);
      return databaseService.createRessource(ressourceName, data);
    } catch (error) {
      throw error;
    }
  }

  async deleteRessource(
    project: ProjectWithSettings,
    ressourceName: string,
    ressourceId: string,
    primaryKey: string = 'id',
  ) {
    try {
      const databaseService = new DatabaseService(project.settings);

      await databaseService.deleteRessource(
        ressourceName,
        ressourceId,
        primaryKey,
      );
    } catch (error) {
      throw error;
    }
  }

  validateRessourceArgs(
    ressourceName: string,
    schema: ParsedDatabaseSchema,
    data: object,
  ) {
    const args = Object.keys(data);
    const ressource = schema.tables.find(
      (table) => table.name === ressourceName,
    );
    const requiredColumns = ressource.columns.filter(
      (column) => !column.isNullable && !column.defaultValue,
    );

    const missingColumns = requiredColumns
      .filter((column) => !args.includes(column.name))
      .map((column) => column.name);

    if (missingColumns.length) {
      throw new BadRequestException(`Missing columns: ${missingColumns}`);
    }

    const extraColumns = args
      .filter((arg) => !ressource.columns.find((column) => column.name === arg))
      .map((column) => column);

    if (extraColumns.length) {
      throw new BadRequestException(`Invalid columns: ${extraColumns}`);
    }

    return true;
  }
}
