import { DatabaseConfig } from '../types/database-config';
import { SupportedDatabaseTypes } from '../types/supported-database-types';
import { IDatabaseParser } from './base/database-parser.interface';
import { PgsqlDatabaseParser } from './pgsql-database-parser';

export class DatabaseParserFactory {
  static createParser({
    database_type,
    database_url,
  }: DatabaseConfig): IDatabaseParser {
    switch (database_type) {
      case SupportedDatabaseTypes.PGSQL:
        return new PgsqlDatabaseParser(database_url);
      default:
        throw new Error(`Unsupported database type: ${database_type}`);
    }
  }
}
