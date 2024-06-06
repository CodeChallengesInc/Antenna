import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the username in sessionStorage when login is called', () => {
    service.login('testUser');
    expect(sessionStorage.getItem('cci-username')).toBe('testUser');
  });

  it('should retrieve the username from sessionStorage', () => {
    sessionStorage.setItem('cci-username', 'testUser');
    expect(service.username).toBe('testUser');
  });

  it('should clear the sessionStorage when logout is called', () => {
    sessionStorage.setItem('cci-username', 'testUser');
    service.logout();
    expect(sessionStorage.getItem('cci-username')).toBeNull();
  });
});
