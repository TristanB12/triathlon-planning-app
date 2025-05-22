import { DatabaseConfig } from '../types/database-config';
import { SupportedDatabaseTypes } from '../types/supported-database-types';
import { IDatabaseClient } from './base/database-client.interface';
import { PgsqlDatabaseClient } from './pgsql-database-client';

export class DatabaseClientFactory {
  static createClient({
    database_type,
    database_url,
  }: DatabaseConfig): IDatabaseClient {
    switch (database_type) {
      case SupportedDatabaseTypes.PGSQL:
        return new PgsqlDatabaseClient(database_url);
      default:
        throw new Error(`Unsupported database type: ${database_type}`);
    }
  }
}
