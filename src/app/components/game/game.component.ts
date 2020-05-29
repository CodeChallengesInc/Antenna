import { Component, OnInit } from '@angular/core';
import { BoardResponse } from 'src/app/models/board';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cci-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  readonly board$: Observable<BoardResponse>;

  constructor(private gameService: GameService, private route: ActivatedRoute) {
    this.board$ = route.params.pipe(switchMap(params => {
      return this.gameService.getBoard(params.gameId);
    }));
  }

  ngOnInit(): void {
  }

}
