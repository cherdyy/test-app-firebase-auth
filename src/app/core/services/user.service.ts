import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserData } from '@shared/models/user-data.model';


@Injectable()
export class UserService {

  private userData: UserData = null;
  private authUser: firebase.User = null;

  constructor(private db: AngularFirestore) {

  }

  public setUser(user: firebase.User): void {
    this.authUser = user;
  }

  public getUserInfo(): Observable<firebase.firestore.DocumentSnapshot> {
    const collection = this.db.collection('users');

    return collection
      .doc(this.authUser.uid)
      .get()
      .pipe(
        take(1),
        tap((response) => {
          this.userData = new UserData(response.data());

          this.setUserInfo(response.data()).subscribe();
        })
      );
  }

  public setUserInfo(data: Object): Observable<void> {
    const collection = this.db.collection('users');
    const userData = new UserData(data);

    return new Observable(subscriber => {
      collection
        .doc(this.authUser.uid)
        .set({ ...userData })
        .then(response => subscriber.next(response))
        .catch(error => subscriber.error(error));
    });
  }

  public updateUserInfo(): Observable<void> {
    const collection = this.db.collection('users');

    return new Observable(subscriber => {
      collection
        .doc(this.authUser.uid)
        .update({ ...this.userData })
        .then(response => subscriber.next(response))
        .catch(error => subscriber.error(error));
    });
  }

  get UserData(): UserData {
    return this.userData;
  }

  get AuthUser(): firebase.User {
    return this.authUser;
  }
}
