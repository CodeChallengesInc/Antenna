import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BoardResponse } from '../models/board';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfigResponse } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { }

  getBoard(gameId: string): Observable<BoardResponse> {
    const gameUrl = `${environment.backendApi}/board/${gameId}`;
    const configUrl = `${environment.backendApi}/config`;
    return this.httpClient.get<ConfigResponse>(configUrl).pipe(
      switchMap(config => interval(1000 / config.ticksPerSecond)),
      switchMap(() => this.httpClient.get<any>(gameUrl)));
  }

  createGame(): Observable<string> {
    const url = `${environment.backendApi}/game`;
    return this.httpClient.post(url, {}, { responseType: 'text' });
  }
}
