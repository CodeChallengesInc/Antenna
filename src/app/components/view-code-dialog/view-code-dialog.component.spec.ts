import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCodeDialogComponent, ViewCodeDialogData } from './view-code-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { SubmissionService } from '../../services/submission.service';

describe('ViewCodeDialogComponent', () => {
  let component: ViewCodeDialogComponent;
  let fixture: ComponentFixture<ViewCodeDialogComponent>;
  let themeService: ThemeService;
  let submissionService: SubmissionService;
  const themeServiceSpy = jasmine.createSpyObj('ThemeService', ['isDarkTheme']);
  const submissionServiceSpy = jasmine.createSpyObj('SubmissionService', ['getAnt$']);
  const submission = { submission: 'testSubmission' };

  beforeEach(async () => {
    themeServiceSpy.isDarkTheme.and.returnValue(true);
    submissionServiceSpy.getAnt$.and.returnValue(of(submission));
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ ViewCodeDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { ant: { name: 'test', creator: 'testCreator' } } as ViewCodeDialogData },
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: SubmissionService, useValue: submissionServiceSpy }
      ]
    })
    .compileComponents();

    themeService = TestBed.inject(ThemeService);
    submissionService = TestBed.inject(SubmissionService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set theme based on isDarkTheme', () => {
    themeServiceSpy.isDarkTheme.and.returnValue(false);
    fixture = TestBed.createComponent(ViewCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.theme).toBe('vs');

    themeServiceSpy.isDarkTheme.and.returnValue(true);
    fixture = TestBed.createComponent(ViewCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.theme).toBe('vs-dark');
  });

  it('should set codeModel based on getAnt$ response', () => {
    component.ngOnInit();
    expect(component.codeModel.value).toBe(submission.submission);
  });
});
