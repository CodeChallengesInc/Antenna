import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidator, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SubmissionService } from '../services/submission.service';
import { map } from 'rxjs/operators';

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

@Directive({
  selector: '[appRestrictedValues][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: RestrictedValuesDirective,
      multi: true
    }
  ]
})
export class RestrictedValuesDirective implements AsyncValidator {

  @Input() appRestrictedValues: string[] = [];

  constructor(private submissionService: SubmissionService) { }

  validate(control: AbstractControl): Observable<ValidationErrors> {
    if (!isEmptyInputValue(control.value)) {
      return this.submissionService.getAnts$().pipe(map(ants => {
        const label = this.trimToLower(control.value);
        const names = ants.map(a => a.name);
        const value = names?.find(f => label === this.trimToLower(f));
        if (value) {
          return { restrictedValue: value };
        }
        return null;
      }));
    }
    return of(null);
  }

  private trimToLower(value: any): string {
    return value?.toString().trim().toLowerCase();
  }

}
