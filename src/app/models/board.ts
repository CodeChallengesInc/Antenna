export interface Ant {
  antName: string;
  name: string;
  column: number;
  row: number;
  score: number;
  color: string;
  error: string;
  creator: string;
}

export interface BoardResponse {
  grid: number[][][];
  animals: Ant[];
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

