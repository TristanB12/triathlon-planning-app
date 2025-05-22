import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { SupportedDatabaseTypes } from '../../database/types/supported-database-types';

export class Settings {
  @IsNotEmpty()
  @IsString()
  database_url: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(SupportedDatabaseTypes)
  database_type: string;
}

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Settings)
  settings: Settings;
}
