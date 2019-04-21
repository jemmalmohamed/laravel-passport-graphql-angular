import { Router } from '@angular/router';
import { LOGOUT_MUTATION } from './queries/authQueries';
import { Tokens } from './models/tokens';

import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, tap, mapTo, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  private loggedUser: string;

  constructor(private _apollo: Apollo, private _router: Router) { }


  login(mutation, userData) {

    return this._apollo.mutate({
      mutation: mutation,
      variables: {
        username: userData.email,
        password: userData.password,
      }
    }).pipe(
      tap(res => this.doLoginUser(res.data)),
      mapTo(true),
      catchError(error => {
        // console.log(error);
        return of(false);
      }
      ));
  }

  logout() {
    return this._apollo.mutate({
      mutation: LOGOUT_MUTATION
    }).pipe(
      tap(() => { this.doLogoutUser(); }),
      mapTo(true),
      catchError(error => {
        console.log('logout error');
        console.log(error);
        return of(false);
      })

    )
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getJwtTokeForInterceptor() {
    return of(localStorage.getItem(this.JWT_TOKEN));
  }

  refreshToken(mutation) {
    return this._apollo.mutate({
      mutation: mutation,
      variables: {
        refresh_token: this.getRefreshToken()
      }
    })
    // .map(
    //   (res) => {
    //     this.storeTokens(res.data.refreshToken);

    //   },
    //   (err) => {
    //     console.log('error on refresh token');
    //     this.removeTokens();
    //     this._router.navigate(['login']);
    //     console.log(err);

    //   }

    // )
    //   .pipe(
    //   tap((res) => {
    //     // console.log(res.data.refreshToken);
    //     this.storeJwtToken(res.data.refreshToken.access_token);
    //   })
    // );
    //   .subscribe(
    //   (res) => {
    //     // console.log(res.data.refreshToken);
    //     this.storeTokens(res.data.refreshToken);
    //   }
    // )
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  getRefreshTokenForInterceptor() {
    return of(localStorage.getItem(this.REFRESH_TOKEN));
  }

  doLoginUser(loginData) {
    this.storeTokens(loginData.login);
  }

  storeTokens(tokens: Tokens) {
    console.log(tokens.expires_in + "seoncdes");
    localStorage.setItem(this.JWT_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }




  doLogoutUser() {
    this.removeTokens();
  }

  doLogoutUserWithRefreshToken() {

    console.log('error on refresh token');
    this.removeTokens();
    this._router.navigate(['login']);

  }

  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }



  signup(mutation, userData) {
    return this._apollo.mutate({
      mutation: mutation,
      variables: {
        username: userData.email,
        password: userData.password,
      }
    });
  }



  storeJwtToken(access_token: string) {
    // console.log("new token :" + access_token);
    localStorage.setItem(this.JWT_TOKEN, access_token);
  }




}
