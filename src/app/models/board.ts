export interface Animal {
  animalName: string;
  column: number;
  row: number;
  score: number;
  color: string;
  error: string;
  creator: string;
}

export interface BoardResponse {
  grid: number[][][];
  animals: Animal[];
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
  FormicAnts = 'FormicAnts'
}

export interface GameTypeInformation {
  gameType: string;
  gameName: string;
  gameRules: string;
}
