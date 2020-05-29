export interface Ant {
  antName: string;
  column: number;
  row: number;
  score: number;
  color: string;
}

export interface Food {
  column: number;
  row: number;
}

export interface BoardResponse {
  grid: number[][];
  ants: Ant[];
  food: Food[];
}
