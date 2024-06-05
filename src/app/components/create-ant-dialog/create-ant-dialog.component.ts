import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cci-create-ant-dialog',
  templateUrl: './create-ant-dialog.component.html',
  styleUrls: ['./create-ant-dialog.component.scss']
})
export class CreateAntDialogComponent implements AfterViewInit {

  antName = 'New Ant';

  @ViewChild('antNameInput') antNameInput?: ElementRef;

  constructor(private dialogRef: MatDialogRef<CreateAntDialogComponent>) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.antNameInput.nativeElement.select();
    }, 0);
  }

  createAnt(): void {
    this.dialogRef.close(this.antName);
  }
}
