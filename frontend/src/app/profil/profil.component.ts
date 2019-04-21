import { REFRESH_TOKEN_MUTATION } from './../queries/authQueries';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  refresh_token() {
    // this._authService.refreshToken(REFRESH_TOKEN_MUTATION);
  }

}
