import { SIGNUP_MUTATION } from './../queries/authQueries';
import { AuthService } from './../auth.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registeredUserData = {};
  constructor(

    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  registerUser() {

    this._auth.signup(SIGNUP_MUTATION, this.registeredUserData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        // console.log(err);
      }

    )

  }

}
