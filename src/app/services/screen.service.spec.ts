import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ScreenService } from './screen.service';
import { of } from 'rxjs';
import exp from 'constants';

describe('ScreenService', () => {
  const falseBreakpointState = { matches: false } as BreakpointState;
  const trueBreakpointState = { matches: true } as BreakpointState;
  const breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);

  it('should return true if observing breakpointObserver returns true', () => {
    breakpointObserverSpy.observe.and.returnValue(of(trueBreakpointState));
    const sut = new ScreenService(breakpointObserverSpy);
    sut.isMobile$.subscribe(result => expect(result).toBeTrue());
  });

  it('should return false if observing breakpointObserver returns false', () => {
    breakpointObserverSpy.observe.and.returnValue(of(falseBreakpointState));
    const sut = new ScreenService(breakpointObserverSpy);
    sut.isMobile$.subscribe(result => expect(result).toBeFalse());
  });
});
