import { Component, OnInit, ViewChild } from '@angular/core';
import { SubmissionService } from '../../services/submission.service';
import { Observable } from 'rxjs';
import { CodeModel, CodeEditorComponent } from '@ngstack/code-editor';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { ThemeService } from '../../services/theme.service';
import { TestAntDialogComponent } from '../test-ant-dialog/test-ant-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cci-edit-ant',
  templateUrl: './edit-ant.component.html',
  styleUrls: ['./edit-ant.component.scss']
})
export class EditAntComponent implements OnInit {

  readonly animalName$: Observable<string>;
  dirty = false;
  readonly = false;

  @ViewChild(CodeEditorComponent) editor?: CodeEditorComponent;

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
    private submissionService: SubmissionService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog,
    private themeService: ThemeService,
    private snackBar: MatSnackBar,
    ) {
    this.animalName$ = route.params.pipe(map(p => p.animalName));
    this.route.params.pipe(switchMap(params => this.submissionService.getAnt$(params.animalName, params.creatorName))).subscribe(ant => {
      if (ant) {
        this.codeModel = {
          language: 'javascript',
          uri: '',
          value: ant.submission,
        };
        this.readonly = this.auth.username.toLowerCase() !== ant.username.toLowerCase();
        setTimeout(() => {
          this.dirty = false;
        }, 100);

      }
    });
    this.refreshTheme();
    this.themeService.themeChanged.subscribe(() => this.refreshTheme());
  }

  private refreshTheme(): void {
    if (this.themeService.isDarkTheme()) {
      this.theme = 'vs-dark';
    } else {
      this.theme = 'vs';
    }
  }

  ngOnInit(): void {
  }

  onChanged(): void {
    this.dirty = true;
  }

  submit(): void {
    this.submissionService.submitAnt$(this.route.snapshot.params.animalName, this.codeModel.value).subscribe(result => {
      this.snackBar.open('Ant Saved Successfully', undefined, { duration: 2000 });
      this.dirty = false;
    });  }

  testAnt(): void {
    this.dialog.open(TestAntDialogComponent, {
      data: {
        animalName: this.route.snapshot.params.animalName,
        code: this.codeModel.value,
      },
      minWidth: '300px',
      minHeight: '300px',
    });
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this ant?',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      const animalName = this.route.snapshot.params.animalName;
      if (result && animalName) {
        this.submissionService.deleteAnt$(animalName).subscribe(() => {
          this.router.navigate(['edit-ants']);
        });
      }
    });
  }
}
