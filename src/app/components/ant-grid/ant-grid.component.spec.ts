import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AntGridComponent } from './ant-grid.component';
import { ThemeService } from '../../services/theme.service';
import { ElementRef, SimpleChange } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Ant } from '../../models/board';

describe('AntGridComponent', () => {
  let component: AntGridComponent;
  let fixture: ComponentFixture<AntGridComponent>;
  let themeService: ThemeService;
  let cdr: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntGridComponent ],
      providers: [ ThemeService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntGridComponent);
    component = fixture.componentInstance;
    component.canvas = new ElementRef(document.createElement('canvas'));
    themeService = TestBed.inject(ThemeService);
    cdr = fixture.componentRef.injector.get(ChangeDetectorRef);
    component.grid = [[[]]];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize canvas context and dimensions', () => {
    component.cellSize = 10;
    component.ngAfterViewInit();
    expect(component.context).toBeTruthy();
    expect(component.canvasHeight).toBe(30);
    expect(component.canvasWidth).toBe(30);
  });

  it('should not update highScore if animals array is empty', () => {
    const changes = { animals: new SimpleChange(null, [], true) };
    component.ngOnChanges(changes);
    expect(component.highScore).toBe(0);
  });

  it('should not update highScore if animals array has only one element', () => {
    component.animals = [{
      name: 'ant', score: 10,
      antName: '',
      column: 0,
      row: 0,
      color: '',
      error: '',
      creator: ''
    }];
    const changes = { animals: new SimpleChange(null, [{ score: 10 }], true) };
    component.ngOnChanges(changes);
    expect(component.highScore).toBe(0);
  });
});
