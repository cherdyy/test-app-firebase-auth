import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private unsubscriber$: Subject<any> = new Subject();

  constructor(public user: UserService,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout()
      .pipe(
        takeUntil(this.unsubscriber$)
      )
      .subscribe(() => {
        this.router.navigate(['/auth/sign-in']);
      });
  }


  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}
