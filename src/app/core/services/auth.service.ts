import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import AuthProvider = firebase.auth.AuthProvider;
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private user: UserService,
              private afAuth: AngularFireAuth) {
  }

  private socialSignIn(provider: AuthProvider): Observable<firebase.auth.UserCredential> {
    return new Observable(subscriber => {
      this.afAuth.auth.signInWithPopup(provider)
        .then(response => subscriber.next(response))
        .catch(error => subscriber.error(error));
    });
  }

  public authStateObservable(): Observable<firebase.User> {
    return this.afAuth.authState
      .pipe(
        tap(response => {
          this.user.setUser(response);
        })
      );
  }

  public googleLogin(): Observable<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  public facebookLogin(): Observable<firebase.auth.UserCredential> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  public gitHubLogin(): Observable<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }

  public registerWithLoginAndPassword({displayName, email, password}): Observable<firebase.auth.UserCredential> {
    return new Observable(subscriber => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(response => subscriber.next(response))
        .catch(error => subscriber.error(error));
    });
  }

  public loginWithLoginAndPassword({email, password}): Observable<firebase.auth.UserCredential> {
    return new Observable(subscriber => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(response => subscriber.next(response))
        .catch(error => subscriber.error(error));
    });
  }

  public logout(): Observable<void> {
    return new Observable(subscriber => {
      this.afAuth.auth.signOut()
        .then(response => subscriber.next(response))
        .catch(error => subscriber.error(error));
    });
  }

}
