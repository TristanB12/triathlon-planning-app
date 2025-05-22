import { IDatabaseClient } from './database-client.interface';

export abstract class AbstractDatabaseClient implements IDatabaseClient {
  constructor(private databaseUrl: string) {}

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;

  abstract create<T>(tableName: string, data: T): Promise<T>;
  abstract read<T>(tableName: string): Promise<T[]>;
  abstract update<T>(
    tableName: string,
    conditions: Record<string, any>,
    data: Partial<T>,
  ): Promise<T | null>;
  abstract delete(
    tableName: string,
    conditions: Record<string, any>,
  ): Promise<boolean>;
}
