import { DatabaseConnectionFailedException } from '../exceptions/database-connexion-failed.exception';
import {
  ParsedColumn,
  ParsedDatabaseSchema,
  ParsedForeignKey,
  ParsedIndex,
  ParsedTable,
} from '../types/parsed-database-interfaces';
import { AbstractDatabaseParser } from './base/abstract-database-parser';
import { Client } from 'pg';

export class PgsqlDatabaseParser extends AbstractDatabaseParser {
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

  async parseSchema(): Promise<ParsedDatabaseSchema> {
    const tables = await this.getTables();
    const columns = await this.getColumns();
    const primaryKeys = await this.getPrimaryKeys();
    const foreignKeys = await this.getForeignKeys();
    const indexes = await this.getIndexes();

    const parsedSchema: ParsedDatabaseSchema = {
      tables: tables.map((table) => {
        const tableColumns = columns.filter(
          (column) => column.table_name === table.table_name,
        );
        const tablePrimaryKeys = primaryKeys.filter(
          (pk) => pk.table_name === table.table_name,
        );
        const tableForeignKeys = foreignKeys.filter(
          (fk) => fk.table_name === table.table_name,
        );
        const tableIndexes = indexes.filter(
          (index) => index.table_name === table.table_name,
        );

        return this.mapTable(
          table,
          tableColumns,
          tablePrimaryKeys,
          tableForeignKeys,
          tableIndexes,
        );
      }),
    };

    return parsedSchema;
  }

  private async getTables() {
    const res = await this.client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    `);
    return res.rows;
  }

  private async getColumns() {
    const res = await this.client.query(`
      SELECT table_name, column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public';
    `);
    return res.rows;
  }

  private async getPrimaryKeys() {
    const res = await this.client.query(`
      SELECT t.table_name, c.column_name
      FROM information_schema.table_constraints t
      JOIN information_schema.key_column_usage c 
        ON t.constraint_name = c.constraint_name
      WHERE t.constraint_type = 'PRIMARY KEY';
    `);
    return res.rows;
  }

  private async getForeignKeys() {
    const res = await this.client.query(`
      SELECT kcu.table_name, kcu.column_name, ccu.table_name AS referenced_table_name, ccu.column_name AS referenced_column_name
      FROM information_schema.key_column_usage kcu
      JOIN information_schema.referential_constraints rc
        ON kcu.constraint_name = rc.constraint_name
      JOIN information_schema.constraint_column_usage ccu
        ON rc.unique_constraint_name = ccu.constraint_name;
    `);
    return res.rows;
  }

  private async getIndexes() {
    const res = await this.client.query(`
      SELECT indexname, indexdef, tablename
      FROM pg_indexes
      WHERE schemaname = 'public';
    `);
    return res.rows;
  }

  private mapTable(
    table: any,
    columns: any[],
    primaryKeys: any[],
    foreignKeys: any[],
    indexes: any[],
  ): ParsedTable {
    const tableName = table.table_name;

    return {
      name: tableName,
      columns: columns.map(
        (column): ParsedColumn => ({
          name: column.column_name,
          type: column.data_type,
          isNullable: column.is_nullable === 'YES',
          isPrimaryKey: primaryKeys.some(
            (pk) => pk.column_name === column.column_name,
          ),
          defaultValue: column.column_default || null,
        }),
      ),
      primaryKey: primaryKeys.map((pk) => pk.column_name)[0],
      foreignKeys: foreignKeys.map(
        (fk): ParsedForeignKey => ({
          column: fk.column_name,
          referencedTable: fk.referenced_table_name,
          referencedColumn: fk.referenced_column_name,
        }),
      ),
      indexes: indexes.map(
        (index): ParsedIndex => ({
          name: index.indexname,
          columns: this.extractColumnsFromIndex(index.indexdef),
          isUnique: index.indexdef.includes('UNIQUE'),
        }),
      ),
    };
  }

  private extractColumnsFromIndex(indexDef: string): string[] {
    // Extract column names from index definition, assuming simple case
    const match = indexDef.match(/\((.*?)\)/);
    return match ? match[1].split(',').map((col) => col.trim()) : [];
  }
}
