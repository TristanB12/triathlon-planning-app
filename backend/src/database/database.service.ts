import { NotFoundException } from '@nestjs/common';
import { IDatabaseClient } from './clients/base/database-client.interface';
import { DatabaseClientFactory } from './clients/database-client.factory';
import { IDatabaseParser } from './parsers/base/database-parser.interface';
import { DatabaseParserFactory } from './parsers/database-parser.factory';
import { DatabaseConfig } from './types/database-config';

export class DatabaseService {
  private parser: IDatabaseParser;
  private client: IDatabaseClient;

  constructor(config: DatabaseConfig) {
    this.parser = DatabaseParserFactory.createParser(config);
    this.client = DatabaseClientFactory.createClient(config);
  }

  async getSchema() {
    await this.parser.connect();
    const schema = await this.parser.parseSchema();
    await this.parser.disconnect();
    return schema;
  }

  async getRessource(ressourceName: string) {
    await this.client.connect();

    const result = await this.client.read(ressourceName);
    await this.client.disconnect();
    return result;
  }

  async createRessource(ressourceName: string, data: object) {
    await this.client.connect();

    const result = await this.client.create(ressourceName, data);
    await this.client.disconnect();
    return result;
  }

  async deleteRessource(
    ressourceName: string,
    ressourceId: string,
    primaryKey: string,
  ) {
    await this.client.connect();

    const conditions: Record<string, any> = { [primaryKey]: ressourceId };
    const result = await this.client.delete(ressourceName, conditions);
    if (!result) {
      throw new NotFoundException('Ressource not found.');
    }
    await this.client.disconnect();
    return result;
  }
}
