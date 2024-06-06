import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAntDialogComponent } from './create-ant-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

describe('CreateAntDialogComponent', () => {
  let component: CreateAntDialogComponent;
  let fixture: ComponentFixture<CreateAntDialogComponent>;
  let dialogRef: MatDialogRef<CreateAntDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, FormsModule],
      declarations: [ CreateAntDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAntDialogComponent);
    component = fixture.componentInstance;
    component.antNameInput = new ElementRef(document.createElement('input'));
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select antNameInput on view init', (done) => {
    spyOn(component.antNameInput.nativeElement, 'select');
    component.ngAfterViewInit();
    setTimeout(() => {
      expect(component.antNameInput.nativeElement.select).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('should close dialog with ant name on createAnt', () => {
    component.antName = 'Test Ant';
    component.createAnt();
    expect(dialogRef.close).toHaveBeenCalledWith('Test Ant');
  });
});
