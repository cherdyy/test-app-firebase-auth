import { Injectable } from '@angular/core';
import { UserData } from '@shared/models/user-data.model';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()
export class UserService {

  private userData: UserData = new UserData();
  private user: firebase.User = null;


  constructor(private db: AngularFireDatabase) {
  }

  public setUser(user: firebase.User) {
    this.user = user;
  }

}
