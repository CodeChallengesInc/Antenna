import { Injectable } from '@angular/core';
import { Observable, interval, of, timer, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BoardResponse } from '../models/board';
import { switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfigResponse } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly maximumTicks = 1000;

  constructor(private httpClient: HttpClient) { }

  getBoard$(gameId: string): Observable<BoardResponse> {
    const stopSubject = new Subject();
    const gameUrl = `${environment.backendApi}/board/${gameId}`;
    const configUrl = `${environment.backendApi}/config`;
    return this.httpClient.get<ConfigResponse>(configUrl).pipe(
      switchMap(config => interval(1000 / config.ticksPerSecond)),
      switchMap(() => this.httpClient.get<BoardResponse>(gameUrl)),
      takeUntil(stopSubject),
      tap(value => {
        if (value.elapsedTicks === this.maximumTicks) {
          // Use settimeout here so a value is still emitted even when loading a completed board
          setTimeout(() => {
            stopSubject.next();
            stopSubject.complete();
          }, 0);

        }
      }));
  }

  createGame$(): Observable<string> {
    const url = `${environment.backendApi}/game`;
    return this.httpClient.post(url, {}, { responseType: 'text' });
  }
}
