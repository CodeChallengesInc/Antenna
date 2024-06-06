import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteMock = {
      snapshot: {
        queryParams: {
          returnUrl: '/returnUrl'
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.login and Router.navigate when login is called', () => {
    component.username = 'testUser';
    component.login();
    expect(authServiceMock.login).toHaveBeenCalledWith('testUser');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/returnUrl']);
  });

  it('should navigate to /home if no returnUrl is provided', () => {
    activatedRouteMock.snapshot.queryParams.returnUrl = null;
    component.username = 'testUser';
    component.login();
    expect(authServiceMock.login).toHaveBeenCalledWith('testUser');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not call AuthService.login or Router.navigate when login is called with no username', () => {
    component.username = '';
    component.login();
    expect(authServiceMock.login).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
