import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public user: UserService,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

}
