import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';
import { BoardResponse } from 'src/app/models/board';
import { Router } from '@angular/router';
import { SubmissionService } from '../../services/submission.service';
import { AuthService } from '../../services/auth.service';
import { ScreenService } from '../../services/screen.service';
import { GameTypeService } from 'src/app/services/game-type.service';

@Component({
  selector: 'cci-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  board$: Observable<BoardResponse>;
  username = '';
  readonly rules$: Observable<string>;
  readonly isMobile$: Observable<boolean>;

  constructor(
    private gameTypeService: GameTypeService,
    private gameService: GameService,
    private screen: ScreenService,
    private auth: AuthService,
    private router: Router,
    submissionService: SubmissionService,
    ) {
      this.rules$ = submissionService.getRules$();
      this.username = auth.username;
      this.isMobile$ = screen.isMobile$;
    }

  createGame(): void {
    this.gameService.createGame$(this.gameTypeService.currentGameType).subscribe(gameId => {
      this.router.navigate([`game/${gameId}`]);
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
    this.username = this.auth.username;
  }
}
