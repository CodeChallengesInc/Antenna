import { Injectable } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BoardResponse } from '../models/board';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfigResponse } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { }

  private maximumTicks: number;

  getConfig$(): Observable<ConfigResponse> {
    const configUrl = `${environment.backendApi}/config`;
    return this.httpClient.get<ConfigResponse>(configUrl);
  }

  getBoard$(gameId: string): Observable<BoardResponse> {
    const stopSubject = new Subject();
    const gameUrl = `${environment.backendApi}/board/${gameId}`;
    return this.getConfig$().pipe(
      switchMap(config => {
        this.maximumTicks = config.maxTicks; // I'm sorry
        return interval(1000 / config.ticksPerSecond);
      }),
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

  deleteGame$(gameId: string): Observable<any> {
    const url = `${environment.backendApi}/game/${gameId}`;
    return this.httpClient.delete(url);
  }

  createGame$(): Observable<string> {
    const url = `${environment.backendApi}/game`;
    return this.httpClient.post(url, {}, { responseType: 'text' });
  }

  createTestGame$(antName: string, code: string): Observable<string> {
    const url = `${environment.backendApi}/test`;
    return this.httpClient.post(url, { antName, code }, { responseType: 'text' });
  }
}
