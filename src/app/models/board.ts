export interface Ant {
  antName: string;
  column: number;
  row: number;
  score: number;
  color: string;
  error: string;
  creator: string;
}

export interface Food {
  column: number;
  row: number;
}

export interface BoardResponse {
  grid: number[][];
  ants: Ant[];
  food: Food[];
  gameStatus: GameStatus;
  gameType: GameType;
}

export interface GameStatus {
  gameLength: number;
  ticksPerSecond: number;
  elapsedTicks: number;
  foodLeft: number;
}

export enum GameType {
  LoneAnt = 'LoneAnt',
  SpawningAnts = 'SpawningAnts',
}

