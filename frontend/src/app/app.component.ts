import { LOGOUT_MUTATION } from './queries/authQueries';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  apollo: Apollo;
  constructor(
    private authService: AuthService,
    private _router: Router
  ) { }

  logout() {
    this.authService.logout()
      .subscribe(success => {
        // console.log("logout : " + success);
        if (success) {
          this._router.navigate(['/login']);
          // this.apollo.getClient().resetStore();
        }
      }

      );
  }



}
