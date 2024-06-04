import { Component, OnInit, Inject } from '@angular/core';
import { Ant } from 'src/app/models/board';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

export interface AntErrorDialogData {
  ant: Ant;
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
