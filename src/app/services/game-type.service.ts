import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameTypeService {


  gameTypes$: Observable<string[]>;

  private readonly gameTypeKey = 'cci-gameType';

  gameTypeChanged = new EventEmitter<string>();
  currentGameType = 'LoneAnt';

  constructor() {

    const gameType = localStorage.getItem(this.gameTypeKey);
    if (gameType) {
      this.setGameType(gameType);
    } else {
      this.setGameType(this.currentGameType);
    }

    this.gameTypes$ = of(['LoneAnt', 'SpawningAnts']);
  }

  get gameType(): string {
    return localStorage.getItem( this.gameTypeKey );
  }

  setGameType(gameType: string): void {
      localStorage.setItem(this.gameTypeKey, gameType);
      this.currentGameType = gameType;
      this.gameTypeChanged.emit();
    }
}
