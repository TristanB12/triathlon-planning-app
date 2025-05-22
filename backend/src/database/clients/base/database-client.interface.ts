export interface IDatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;

  create<T>(tableName: string, data: T): Promise<T>;
  read<T>(tableName: string): Promise<T[]>;
  update<T>(
    tableName: string,
    conditions: Record<string, any>,
    data: Partial<T>,
  ): Promise<T | null>;
  delete(tableName: string, conditions: Record<string, any>): Promise<boolean>;
}
