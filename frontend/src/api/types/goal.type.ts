export type Goal = {
  id: number;

  name: string;
  current: boolean;
  distance_type: TriathlonDistance;
  end_at: string; // ISO date
}

export enum TriathlonDistance {
  SPRINT = 'SPRINT',
  OLYMPIC = 'OLYMPIC',
  HALF_IRONMAN = 'HALF_IRONMAN',
  IRONMAN = 'IRONMAN'
}
