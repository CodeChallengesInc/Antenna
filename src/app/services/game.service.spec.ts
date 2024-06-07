import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GameService } from './game.service';
import { GameStatus, BoardResponse, GameType } from '../models/board';
import { environment } from 'src/environments/environment';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameService]
    });

    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch game status', () => {
    const mockGameStatus: GameStatus = {
      gameLength: 100, ticksPerSecond: 2,
      elapsedTicks: 0,
      foodLeft: 0
    };
    const gameId = 'testGameId';

    service.getGameStatus$(gameId).subscribe(status => {
      expect(status).toEqual(mockGameStatus);
    });

    const req = httpMock.expectOne(`${environment.backendApi}/gameStatus/${gameId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockGameStatus);
  });

  // Similar tests can be written for deleteGame$, createGame$, and createTestGame$ methods
  it('should delete game', () => {
    const gameId = 'testGameId';

    service.deleteGame$(gameId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${environment.backendApi}/game/${gameId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should create game', () => {
    service.createGame$().subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${environment.backendApi}/game`);
    expect(req.request.method).toBe('POST');
    req.flush('testGameId');
  });

  it('should create test game', () => {
    const antName = 'testAnt';
    const code = 'testCode';

    service.createTestGame$(antName, code).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${environment.backendApi}/test`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: antName, code, gameType: GameType.LoneAnt});
    req.flush('testGameId');
  });
});
