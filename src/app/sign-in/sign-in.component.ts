import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public form: FormGroup;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router) {
    this.initForm();
  }

  ngOnInit() {
  }

  private initForm(): void {
    this.form = this.fb.group({
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

  public signIn(): void {
    if (this.form.invalid) {
      return;
    }

    this.auth.loginWithLoginAndPassword(this.form.value)
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
