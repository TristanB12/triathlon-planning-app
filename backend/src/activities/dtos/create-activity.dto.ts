import { ActivityStatus, SportType } from "@prisma/client";
import { IsDateString, IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateActivityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(ActivityStatus)
  status?: ActivityStatus;

  @IsNotEmpty()
  @IsEnum(SportType)
  sport_type: SportType;

  @IsNotEmpty()
  @IsISO8601()
  planned_on: string;

  @IsNotEmpty()
  @IsNumber()
  estimated_duration: number;

  @IsOptional()
  @IsISO8601()
  start_at?: string;

  @IsOptional()
  @IsISO8601()
  end_at?: string;

  @IsNotEmpty()
  @IsNumber()
  distance: number;
}
