import { SportLevel, TriathlonDistance } from "@prisma/client";

export type MainPromptVariables = {
  age?: number;

  goal: TriathlonDistance;
  goal_date: string;

  run_level: SportLevel;
  bike_level: SportLevel;
  swim_level: SportLevel;

  number_days_available_per_week: number;
}

export type PromptPayload = {
  [K in keyof MainPromptVariables]: string;
};
