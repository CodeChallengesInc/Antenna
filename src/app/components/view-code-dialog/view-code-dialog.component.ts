import { Component, OnInit, Inject } from '@angular/core';
import { Animal } from 'src/app/models/board';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodeModel } from '@ngstack/code-editor';
import { ThemeService } from 'src/app/services/theme.service';
import { SubmissionService } from '../../services/submission.service';

export interface ViewCodeDialogData {
  animal: Animal;
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
    this.submissionService.getAnt$(this.data.animal.name, this.data.animal.creator).subscribe(submission => {
      this.codeModel = {
        language: 'javascript',
        uri: '',
        value: submission.submission,
      };
    });
  }
}
