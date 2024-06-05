import { Component, OnInit, Inject } from '@angular/core';
import { Ant } from 'src/app/models/board';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodeModel } from '@ngstack/code-editor';
import { ThemeService } from 'src/app/services/theme.service';
import { SubmissionService } from '../../services/submission.service';

export interface ViewCodeDialogData {
  ant: Ant;
}

@Component({
  selector: 'cci-view-code-dialog',
  templateUrl: './view-code-dialog.component.html',
  styleUrls: ['./view-code-dialog.component.scss']
})
export class ViewCodeDialogComponent implements OnInit {

  theme = 'vs';

  codeModel: CodeModel = {
    language: 'javascript',
    uri: '',
    value: '',
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ViewCodeDialogData,
    private submissionService: SubmissionService,
    themeService: ThemeService) {
    if (themeService.isDarkTheme()) {
      this.theme = 'vs-dark';
    } else {
      this.theme = 'vs';
    }
  }

  ngOnInit(): void {
    this.submissionService.getAnt$(this.data.ant.name, this.data.ant.creator).subscribe(submission => {
      this.codeModel = {
        language: 'javascript',
        uri: '',
        value: submission.submission,
      };
    });
  }
}
