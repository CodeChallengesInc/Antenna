import { Component, OnInit, Inject } from '@angular/core';
import { Animal } from 'src/app/models/board';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AntErrorDialogData {
  animal: Animal;
}

@Component({
  selector: 'cci-ant-error-dialog',
  templateUrl: './ant-error-dialog.component.html',
  styleUrls: ['./ant-error-dialog.component.scss']
})
export class AntErrorDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AntErrorDialogData
  ) { }

  ngOnInit(): void {
  }

}
