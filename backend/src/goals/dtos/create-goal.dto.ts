import { TriathlonDistance } from "@prisma/client";
import { IsEnum, IsISO8601, IsNotEmpty, IsString } from "class-validator";

export class CreateGoalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(TriathlonDistance)
  distance_type: TriathlonDistance;

  @IsNotEmpty()
  @IsISO8601()
  end_at: string;
}
