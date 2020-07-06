import { Component } from '@angular/core';
import { GameTypeService } from '../../services/game-type.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cci-game-type-selector',
  templateUrl: './game-type-selector.component.html',
  styleUrls: ['./game-type-selector.component.scss']
})
export class GameTypeSelectorComponent {

  readonly gameTypes$: Observable<string[]>;

  constructor(private gameTypeService: GameTypeService) {
    this.gameTypes$ = gameTypeService.gameTypes$;
  }

  changeGameType(gameType: string): void {
    this.gameTypeService.setGameType(gameType);
  }

  isCurrentGameType(gameType: string): boolean {
    return this.gameTypeService.currentGameType === gameType;
  }
}
