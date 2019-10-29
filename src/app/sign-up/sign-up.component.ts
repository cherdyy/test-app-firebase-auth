import { Component, OnInit, Self } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UnsubscribeService } from '@shared/services/unsubscribe.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [UnsubscribeService]
})
export class SignUpComponent implements OnInit {

  public form: FormGroup;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router,
              @Self() private unsubscribe$: UnsubscribeService) {
    this.initForm();
  }

  ngOnInit() {
  }

  private initForm(): void {
    this.form = this.fb.group({
      displayName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/([a-zA-Z\_.0-9])+/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
    });
  }

  public signUp(): void {
    if (this.form.invalid) {
      return;
    }

    this.auth
      .registerWithLoginAndPassword(this.form.value)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response) => {
        this.navigateToProfile(response.user.uid);
      },
        error => {
          // :TODO
        });
  }

  private navigateToProfile(uid: string): void {
    this.router.navigate([uid]);
  }
}
