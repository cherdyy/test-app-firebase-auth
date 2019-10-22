import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "@core/services/auth.service";
import { UserService } from "@core/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthentificatedGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private user: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return new Observable<boolean>(subscriber => {
      this.auth
        .authStateObservable()
        .subscribe((response) => {
          if(response) {
            subscriber.next(true);
          } else {
            this.router.navigate(['/auth/sign-up']);
            subscriber.next(false);
          }
          },
          error => subscriber.next(false))
    })

  }
}
