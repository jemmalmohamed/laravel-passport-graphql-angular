import { REFRESH_TOKEN_MUTATION } from './../queries/authQueries';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpEventType } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, switchMap, tap, concatMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return this.authService.getJwtTokeForInterceptor().pipe(
            take(1),
            concatMap(access_token => {
                if (access_token) {
                    return next.handle(req.clone({
                        setHeaders: { Authorization: `Bearer ${access_token}` }
                    }));
                }
                return next.handle(req);
            }),
            concatMap(event => {
                let needToAuthenticate1 = false;
                let needToAuthenticate2 = false;
                let refreshTokenInvalid = false;
                if (
                    event.type === HttpEventType.Response &&
                    event.status === 200 &&
                    event.body &&
                    Array.isArray(event.body.errors)
                ) {
                    const errors = event.body.errors as any[];
                    console.log(errors);
                    needToAuthenticate1 = !!errors.find(e => e.message && e.message === 'Not Authenticated');
                    needToAuthenticate2 = !!errors.find(e => e.debugMessage && e.debugMessage === 'Unauthenticated.');
                    refreshTokenInvalid = !!errors.find(e => e.message && e.message === 'The refresh token is invalid.');
                }
                console.log('needToAuthenticate');
                console.log(needToAuthenticate1);

                if (refreshTokenInvalid) {
                    this.authService.doLogoutUserWithRefreshToken();
                }

                if (needToAuthenticate1 || needToAuthenticate2) {
                    return this.authService.getRefreshTokenForInterceptor().pipe(
                        take(1),
                        concatMap(refresh_token =>
                            this.authService.refreshToken(REFRESH_TOKEN_MUTATION).pipe(
                                tap((res) => this.authService.storeTokens(res.data.refreshToken))
                            )
                        ),

                        concatMap(() => this.authService.getJwtTokeForInterceptor()
                            .pipe(
                                take(1),
                                concatMap(access_token => {
                                    if (access_token) {
                                        return next.handle(req.clone({
                                            setHeaders: { Authorization: `Bearer ${access_token}` }
                                        }));
                                    } else {
                                        throw new Error('Error getting access token after logging in with refresh token');
                                    }
                                })
                            )


                        )
                    );
                }



                console.log('event');
                console.log(event);
                return of(event);
            })

        );

    }
}
