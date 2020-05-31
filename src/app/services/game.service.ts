import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BoardResponse } from '../models/board';
import { switchMap } from 'rxjs/operators';
import { ConfigResponse } from '../models/config';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient, private appConfig: AppConfigService) { }

  getBoard$(gameId: string): Observable<BoardResponse> {
    const gameUrl = `${this.appConfig.config.backendApi}/board/${gameId}`;
    const configUrl = `${this.appConfig.config.backendApi}/config`;
    return this.httpClient.get<ConfigResponse>(configUrl).pipe(
      switchMap(config => interval(1000 / config.ticksPerSecond)),
      switchMap(() => this.httpClient.get<any>(gameUrl)));
  }

  createGame$(): Observable<string> {
    const url = `${this.appConfig.config.backendApi}/game`;
    return this.httpClient.post(url, {}, { responseType: 'text' });
  }
}
