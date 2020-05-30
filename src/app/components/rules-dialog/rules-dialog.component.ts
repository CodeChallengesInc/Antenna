import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'cci-rules-dialog',
  templateUrl: './rules-dialog.component.html',
  styleUrls: ['./rules-dialog.component.scss']
})
export class RulesDialogComponent {

  readonly rules$: Observable<any>;

  constructor(submissionService: SubmissionService) {
    this.rules$ = submissionService.getRules$();
  }
}
