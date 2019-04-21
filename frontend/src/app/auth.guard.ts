import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {

  }

  canActivate() {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/profil']);
    }
    return !this._authService.isLoggedIn();
  }
}
