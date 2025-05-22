import { ParsedDatabaseSchema } from '../../types/parsed-database-interfaces';
import { IDatabaseParser } from './database-parser.interface';

export abstract class AbstractDatabaseParser implements IDatabaseParser {
  constructor(protected databaseUrl: string) {}

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract parseSchema(): Promise<ParsedDatabaseSchema>;
}
