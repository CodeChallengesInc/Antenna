import { Injectable } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GameStatus, GameTypeInformation } from '../models/board';
import { BoardResponse,  } from '../models/board';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { }

  private maximumTicks: number;
  getGameStatus$(gameId: string): Observable<GameStatus> {
    const gameStatusUrl = `${environment.backendApi}/gameStatus/${gameId}`;
    return this.httpClient.get<GameStatus>(gameStatusUrl);
  }

  get gameTypes$(): Observable<GameTypeInformation[]> {
    const gameTypesUrl = `${environment.backendApi}/gameTypes`;
    return this.httpClient.get<GameTypeInformation[]>(gameTypesUrl);
  }


  getBoard$(gameId: string): Observable<BoardResponse> {
    const stopSubject = new Subject();
    const gameUrl = `${environment.backendApi}/board/${gameId}`;
    return this.getGameStatus$(gameId).pipe(
      switchMap(status => {
        this.maximumTicks = status.gameLength; // I'm sorry
        return interval(1000 / status.ticksPerSecond);
      }),
      switchMap(() => this.httpClient.get<BoardResponse>(gameUrl)),
      takeUntil(stopSubject),
      tap(value => {
        if (value.gameStatus.elapsedTicks === this.maximumTicks) {
          // Use settimeout here so a value is still emitted even when loading a completed board
          setTimeout(() => {
            stopSubject.next();
            stopSubject.complete();
          }, 0);

        }
      }));
  }

  deleteGame$(gameId: string): Observable<any> {
    const url = `${environment.backendApi}/game/${gameId}`;
    return this.httpClient.delete(url);
  }

  createGame$(gameType: string): Observable<string> {
    const url = `${environment.backendApi}/game`;
    return this.httpClient.post(url, { gameType }, { responseType: 'text' });
  }

  createTestGame$(gameType: string, name: string, code: string): Observable<string> {
    const url = `${environment.backendApi}/test`;
    return this.httpClient.post(url, { gameType, name, code }, { responseType: 'text' });
  }
}
