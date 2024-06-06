import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RulesDialogComponent } from './rules-dialog.component';
import { SubmissionService } from 'src/app/services/submission.service';
import { of } from 'rxjs';

describe('RulesDialogComponent', () => {
  let component: RulesDialogComponent;
  let fixture: ComponentFixture<RulesDialogComponent>;
  let submissionService: SubmissionService;

  beforeEach(async () => {
    const submissionServiceSpy = jasmine.createSpyObj('SubmissionService', ['getRules$']);
    submissionServiceSpy.getRules$.and.returnValue(of('text'));

    await TestBed.configureTestingModule({
      declarations: [ RulesDialogComponent ],
      providers: [
        { provide: SubmissionService, useValue: submissionServiceSpy }
      ]
    })
    .compileComponents();

    submissionService = TestBed.inject(SubmissionService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set rules$ based on getRules$ response', () => {
    component = new RulesDialogComponent(submissionService);
    component.rules$.subscribe(data => {
      expect(data).toEqual('text');
    });
  });
});
