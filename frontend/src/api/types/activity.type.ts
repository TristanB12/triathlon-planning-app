export type Activity = {
  id: number;
  name: string;

  description?: string;
  status: ActivityStatus;
  sport_type: SportType;

  planned_on: string; // ISO string
  estimated_duration: number;

  start_at?: string; // ISO string
  end_at?: string; // ISO string
  distance: number;

  created_at: string; // ISO string
  updated_at: string; // ISO string
}

export enum ActivityStatus {
  PLANNED,
  COMPLETED,
  CANCELLED
}

export enum SportType {
  RUNNING = 'RUNNING',
  CYCLING = 'CYCLING',
  SWIMMING = 'SWIMMING'
}

export type ActivitiesFiltering = {
  planned_before?: string;
  planned_after?: string;
}
