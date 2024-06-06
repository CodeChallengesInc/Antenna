import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AntErrorDialogComponent, AntErrorDialogData } from './ant-error-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ant } from 'src/app/models/board';

describe('AntErrorDialogComponent', () => {
  let component: AntErrorDialogComponent;
  let fixture: ComponentFixture<AntErrorDialogComponent>;
  let testAnt: Ant = {
    antName: 'Greg', name: 'Test Ant',
    column: 0,
    row: 0,
    score: 0,
    color: '',
    error: '',
    creator: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntErrorDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { ant: testAnt } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject data correctly', () => {
    expect(component.data).toEqual({ ant: testAnt });
  });
});
