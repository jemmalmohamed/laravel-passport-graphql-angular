import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {

  }
  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate(['/login']);
    }
    return this._authService.isLoggedIn();
  }
}
