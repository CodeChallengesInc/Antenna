import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get username(): string {
    return sessionStorage.getItem('cci-username');
  }

  login(username: string): void {
    sessionStorage.setItem('cci-username', username);
  }

  logout(): void {
    sessionStorage.clear();
  }
}
