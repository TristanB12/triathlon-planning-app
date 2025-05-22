import { ParsedDatabaseSchema } from '../../types/parsed-database-interfaces';

export interface IDatabaseParser {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  parseSchema(): Promise<ParsedDatabaseSchema>;
}
