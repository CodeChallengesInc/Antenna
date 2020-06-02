import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cci-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  username = '';
  @ViewChild('usernameInput') usernameInput?: ElementRef;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.usernameInput.nativeElement.select();
    }, 0);
  }

  ngOnInit(): void {
  }

  login(): void {
    this.auth.login(this.username);
    if (this.route.snapshot.queryParams.returnUrl) {
      this.router.navigate([this.route.snapshot.queryParams.returnUrl]);
    } else {
      this.router.navigate(['/home']);
    }
  }

}
