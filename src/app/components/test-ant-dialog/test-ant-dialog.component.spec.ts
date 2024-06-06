import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestAntDialogComponent, TestAntDialogData } from './test-ant-dialog.component';
import { GameService } from '../../services/game.service';
import { ScreenService } from '../../services/screen.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardResponse } from 'src/app/models/board';

describe('TestAntDialogComponent', () => {
  let component: TestAntDialogComponent;
  let fixture: ComponentFixture<TestAntDialogComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;
  let mockScreenService: jasmine.SpyObj<ScreenService>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<TestAntDialogComponent>>;
  let mockDialogData: TestAntDialogData = { antName: 'testAnt', code: 'testCode' };

  beforeEach(async () => {
    const testBoardResponse = {
      grid: [[[]]],
      animals: [],
      gameStatus: {
        gameLength: 0,
        ticksPerSecond: 0,
        elapsedTicks: 0,
        foodLeft: 0
      },
      gameType: 'LoneAnt'
    } as BoardResponse
    const gameServiceSpy = jasmine.createSpyObj('GameService', ['createTestGame$', 'getBoard$', 'deleteGame$']);
    const screenServiceSpy = jasmine.createSpyObj('ScreenService', ['isMobile$']);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));
    gameServiceSpy.createTestGame$.and.returnValue(of('testGameId'));
    gameServiceSpy.getBoard$.and.returnValue(Promise.resolve(of(testBoardResponse)));

    await TestBed.configureTestingModule({
      declarations: [ TestAntDialogComponent ],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        { provide: ScreenService, useValue: screenServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    })
    .compileComponents();

    mockGameService = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
    mockScreenService = TestBed.inject(ScreenService) as jasmine.SpyObj<ScreenService>;
    mockDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<TestAntDialogComponent>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAntDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a test game on initialization', () => {
    expect(mockGameService.createTestGame$).toHaveBeenCalledWith(mockDialogData.antName, mockDialogData.code);
    expect(mockGameService.getBoard$).toHaveBeenCalledWith('testGameId');
  });
});
