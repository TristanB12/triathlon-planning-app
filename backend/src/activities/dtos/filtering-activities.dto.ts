import { IsISO8601, IsOptional } from "class-validator";

export class FilteringActivitiesDto {
  @IsOptional()
  @IsISO8601()
  planned_before?: string;

  @IsOptional()
  @IsISO8601()
  planned_after?: string;
}
