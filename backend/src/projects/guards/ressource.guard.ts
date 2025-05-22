import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ParsedDatabaseSchema } from '../../database/types/parsed-database-interfaces';

@Injectable()
export class RessourceGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { ressourceName } = request.params;
    const schema = request.project.database_schema as ParsedDatabaseSchema;

    if (schema.tables.find((table) => table.name === ressourceName)) {
      return true;
    }

    return false;
  }
}
