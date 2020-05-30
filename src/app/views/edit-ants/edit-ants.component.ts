import { Component, OnInit } from '@angular/core';
import { SubmissionsResponse } from 'src/app/models/submissions';
import { Observable } from 'rxjs';
import { SubmissionService } from '../../services/submission.service';
import { MatDialog } from '@angular/material/dialog';
import { RulesDialogComponent } from 'src/app/components/rules-dialog/rules-dialog.component';
import { CreateAntDialogComponent } from 'src/app/components/create-ant-dialog/create-ant-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cci-edit-ants',
  templateUrl: './edit-ants.component.html',
  styleUrls: ['./edit-ants.component.scss']
})
export class EditAntsComponent implements OnInit {

  ants$: Observable<SubmissionsResponse[]>;

  constructor(
    private submissionService: SubmissionService,
    public route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) {
    this.ants$ = submissionService.ants$;
  }

  ngOnInit(): void {
  }

  showRules(): void {
    this.dialog.open(RulesDialogComponent);
  }

  createAnt(): void {
    const dialogRef = this.dialog.open(CreateAntDialogComponent);
    dialogRef.afterClosed().subscribe(antName => {
      if (antName) {
        this.submissionService.submitAnt$(antName, `// Write ${antName} here`).subscribe(() => {
          this.router.navigate(['/edit-ants', antName]);
        });
      }
    });
  }
}
