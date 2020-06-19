import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardResponse } from 'src/app/models/board';
import { GameService } from 'src/app/services/game.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cci-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  readonly board$: Observable<BoardResponse>;

  constructor(private gameService: GameService, private route: ActivatedRoute) {
    this.board$ = route.params.pipe(switchMap(params => {
      return this.gameService.getBoard$(params.gameId);
    }));
  }
}
