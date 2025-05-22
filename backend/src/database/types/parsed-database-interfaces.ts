export interface ParsedDatabaseSchema {
  tables: ParsedTable[];
}

export interface ParsedTable {
  name: string; // Table name
  columns: ParsedColumn[]; // Columns of the table
  primaryKey?: string[]; // List of primary key columns
  foreignKeys?: ParsedForeignKey[]; // Foreign key relationships
  indexes?: ParsedIndex[]; // Indexes on the table
}

export interface ParsedColumn {
  name: string; // Column name
  type: string; // Data type (e.g., VARCHAR, INT, BOOLEAN)
  isNullable: boolean; // Whether the column allows NULL
  isPrimaryKey: boolean; // Whether the column is part of the primary key
  isUnique?: boolean; // Whether the column has a unique constraint
  defaultValue?: string | number | boolean | null; // Default value (if any)
}

export interface ParsedForeignKey {
  column: string; // Local column name
  referencedTable: string; // Referenced table name
  referencedColumn: string; // Referenced column name
}

export interface ParsedIndex {
  name: string; // Index name
  columns: string[]; // List of columns in the index
  isUnique: boolean; // Whether the index is unique
}
