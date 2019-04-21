import { LOGIN_MUTATION } from './../queries/authQueries';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  loginSubmit() {
    this._authService.login(LOGIN_MUTATION, this.loginUserData)
      .subscribe(success => {
        if (success) {
          this._router.navigate(['/profil']);
        }
      });
  }


}
