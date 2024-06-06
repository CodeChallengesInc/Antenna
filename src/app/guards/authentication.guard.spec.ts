import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationGuard } from './authentication.guard';
import { AuthService } from '../services/auth.service';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      username: 'testUser'
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthenticationGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user is authenticated', () => {
    expect(guard.canActivate(null, {
      url: '/test',
      root: new ActivatedRouteSnapshot
    })).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to the login page if the user is not authenticated', () => {
    (authService as any).username = null;
    expect(guard.canActivate(null, {
      url: '/test',
      root: new ActivatedRouteSnapshot
    })).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: '/test' }});
  });
});
