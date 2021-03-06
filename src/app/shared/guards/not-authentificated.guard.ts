import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthentificatedGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return new Observable<boolean>(subscriber => {
      this.auth
        .authStateObservable()
        .subscribe((response) => {
            if (response) {
              const url = state.url;
              const uid = String(response.uid);

              this.router.navigate([uid]);

              subscriber.next(false);
            } else {
              subscriber.next(true);
            }
          },
          error => subscriber.next(false));
    });
  }
}
