import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderboardComponent } from './leaderboard.component';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from '../../services/theme.service';
import { ViewCodeDialogComponent } from '../view-code-dialog/view-code-dialog.component';
import { AntErrorDialogComponent } from '../ant-error-dialog/ant-error-dialog.component';
import { MatSort } from '@angular/material/sort';
import { Ant } from 'src/app/models/board';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let themeService: jasmine.SpyObj<ThemeService>;
  let ant: Ant = {
    name: 'test', score: 1,
    antName: '',
    column: 0,
    row: 0,
    color: '',
    error: '',
    creator: ''
  };

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const themeServiceSpy = jasmine.createSpyObj('ThemeService', ['isDarkTheme']);

    await TestBed.configureTestingModule({
      declarations: [ LeaderboardComponent ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: MatSort, useValue: {} }
      ]
    })
    .compileComponents();

    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    themeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open view code dialog when viewCode is called', () => {

    component.viewCode(ant);
    expect(dialog.open).toHaveBeenCalledWith(ViewCodeDialogComponent, { data: { ant }, width: '1000px', height: '800px' });
  });

  it('should open error dialog when showError is called', () => {
    component.showError(ant);
    expect(dialog.open).toHaveBeenCalledWith(AntErrorDialogComponent, { data: { ant } });
  });

  it('should return correct border color when getBorderColor is called', () => {

    themeService.isDarkTheme.and.returnValue(true);
    expect(component.getBorderColor(ant)).toBe('white');

    themeService.isDarkTheme.and.returnValue(false);
    expect(component.getBorderColor(ant)).toBe('black');

    ant.error = 'error!';
    expect(component.getBorderColor(ant)).toBe('red');

    ant.error = '';
    component.highScore = 1;
    expect(component.getBorderColor(ant)).toBe('gold');
  });
});
