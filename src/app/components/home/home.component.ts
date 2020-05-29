import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';
import { BoardResponse } from 'src/app/models/board';
import { Router } from '@angular/router';

@Component({
  selector: 'cci-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  board$: Observable<BoardResponse>;

  constructor(
    private gameService: GameService,
    private router: Router,
    ) { }

  createGame(): void {
    this.gameService.createGame().subscribe(gameId => {
      this.router.navigate([`game/${gameId}`]);
    });
  }
}
