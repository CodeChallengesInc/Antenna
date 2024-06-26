import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameService } from '../../services/game.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BoardResponse } from 'src/app/models/board';
import { ScreenService } from '../../services/screen.service';

export interface TestAntDialogData {
  antName: string;
  code: string;
}

@Component({
  selector: 'cci-test-ant-dialog',
  templateUrl: './test-ant-dialog.component.html',
  styleUrls: ['./test-ant-dialog.component.scss']
})
export class TestAntDialogComponent {

  readonly board$: Observable<BoardResponse>;
  private gameId = '';
  readonly isMobile$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: TestAntDialogData,
    screen: ScreenService,
    dialogRef: MatDialogRef<TestAntDialogComponent>,
    gameService: GameService) {
    this.isMobile$ = screen.isMobile$;
    this.board$ = gameService.createTestGame$(data.antName, data.code).pipe(switchMap(id => {
      this.gameId = id;
      return gameService.getBoard$(id);
    }));
    // Remove this game when closed / no longer needed
    dialogRef.afterClosed().subscribe(() => {
      if (this.gameId) {
        gameService.deleteGame$(this.gameId).subscribe();
      }
    });
  }
}
