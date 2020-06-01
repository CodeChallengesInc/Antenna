import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';
import { BoardResponse } from 'src/app/models/board';
import { Router } from '@angular/router';
import { SubmissionService } from '../../services/submission.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cci-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  board$: Observable<BoardResponse>;
  username = '';
  readonly rules$: Observable<string>;

  constructor(
    private gameService: GameService,
    private auth: AuthService,
    private router: Router,
    submissionService: SubmissionService,
    ) {
      this.rules$ = submissionService.getRules$();
      this.username = auth.username;
    }

  createGame(): void {
    this.gameService.createGame$().subscribe(gameId => {
      this.router.navigate([`game/${gameId}`]);
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
    this.username = this.auth.username;
  }
}
