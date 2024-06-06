import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDeleteDialogComponent, DialogData } from './confirm-delete-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ConfirmDeleteDialogComponent', () => {
  let component: ConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ ConfirmDeleteDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject dialog data', () => {
    const data: DialogData = { message: 'Test message' };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ ConfirmDeleteDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    });
    fixture = TestBed.createComponent(ConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.data).toEqual(data);
  });
});
