import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cci-create-ant-dialog',
  templateUrl: './create-ant-dialog.component.html',
  styleUrls: ['./create-ant-dialog.component.scss']
})
export class CreateAntDialogComponent implements AfterViewInit {

  name = 'New Ant';

  @ViewChild('nameInput') nameInput?: ElementRef;

  constructor(private dialogRef: MatDialogRef<CreateAntDialogComponent>) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.nameInput.nativeElement.select();
    }, 0);
  }

  createAnt(): void {
    this.dialogRef.close(this.name);
  }
}
