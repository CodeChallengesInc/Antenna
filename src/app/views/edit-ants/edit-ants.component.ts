import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SubmissionsResponse } from 'src/app/models/submissions';
import { Observable, Subscription } from 'rxjs';
import { SubmissionService } from '../../services/submission.service';
import { MatDialog } from '@angular/material/dialog';
import { RulesDialogComponent } from 'src/app/components/rules-dialog/rules-dialog.component';
import { CreateAntDialogComponent } from 'src/app/components/create-ant-dialog/create-ant-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'cci-edit-ants',
  templateUrl: './edit-ants.component.html',
  styleUrls: ['./edit-ants.component.scss']
})
export class EditAntsComponent implements OnInit, AfterViewInit, OnDestroy {

  ants$: Observable<SubmissionsResponse[]>;
  readonly isMobile$: Observable<boolean>;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  private subscriptions = new Subscription();

  constructor(
    private submissionService: SubmissionService,
    public route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private auth: AuthService,
    screen: ScreenService,
    private dialog: MatDialog) {
    this.ants$ = submissionService.ants$;
    this.isMobile$ = screen.isMobile$;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(this.isMobile$.subscribe(isMobile => {
      if (isMobile && this.sidenav && this.sidenav.opened) {
        this.sidenav.close();
      } else if (!isMobile && this.sidenav && !this.sidenav.opened) {
        this.sidenav.open();
      }
      if (!this.route.firstChild && this.sidenav && !this.sidenav.opened) {
        this.sidenav.open();
      }
      this.cdr.detectChanges();
    }));
  }

  ngOnInit(): void {
  }

  showRules(): void {
    this.dialog.open(RulesDialogComponent);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  isReadonly(ant: SubmissionsResponse): boolean {
    return this.auth.username?.toLowerCase() !== ant.username?.toLowerCase();
  }

  antClicked(): void {
    this.isMobile$.pipe(take(1)).subscribe(mobile => {
      if (mobile && this.sidenav) {
        this.sidenav.close();
      }
    });
  }

  createAnt(): void {
    const dialogRef = this.dialog.open(CreateAntDialogComponent, { width: '350px' });
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.http.get('assets/default-ant.js', { responseType: 'text' }).pipe(switchMap(code => {
          return this.submissionService.submitAnt$(name, code);
        })).subscribe(() => {
          this.router.navigate(['/edit-ants', this.auth.username, name]);
        });
      }
    });
  }
}
