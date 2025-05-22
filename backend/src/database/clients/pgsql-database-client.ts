import { Client } from 'pg';
import { AbstractDatabaseClient } from './base/abstract-database-client';
import { DatabaseConnectionFailedException } from '../exceptions/database-connexion-failed.exception';
import { DatabaseException } from '../exceptions/database-exception';

export class PgsqlDatabaseClient extends AbstractDatabaseClient {
  private client: Client;

  constructor(databaseUrl: string) {
    super(databaseUrl);
    this.client = new Client({ connectionString: databaseUrl });
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      throw new DatabaseConnectionFailedException(error.code);
    }
  }

  async disconnect(): Promise<void> {
    this.client.end();
  }

  async create<T>(tableName: string, data: T): Promise<T> {
    const values = Object.values(data);
    const columnsPlaceholder = Object.keys(data).join(', ');
    const valuesPlaceholders = values
      .map((_, index) => `$${index + 1}`)
      .join(', ');

    const query = `INSERT INTO public."${tableName}" (${columnsPlaceholder}) VALUES (${valuesPlaceholders}) RETURNING *`;

    try {
      const res = await this.client.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw new DatabaseException(error.code, error.message);
    }
  }

  async read<T>(tableName: string): Promise<T[]> {
    const res = await this.client.query(`SELECT * FROM public."${tableName}"`);

    return res.rows;
  }

  async update<T>(
    tableName: string,
    conditions: Record<string, any>,
    data: Partial<T>,
  ): Promise<T | null> {
    return null;
  }

  async delete(
    tableName: string,
    conditions: Record<string, any>,
  ): Promise<boolean> {
    const whereClause = Object.entries(conditions)
      .map(([key], i) => `${key} = $${i + 1}`)
      .join(' AND ');

    const values = Object.values(conditions);

    const query = `DELETE FROM public."${tableName}" WHERE ${whereClause}`;

    try {
      const result = await this.client.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  }
}
