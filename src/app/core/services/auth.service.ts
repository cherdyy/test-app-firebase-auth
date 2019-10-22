import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import AuthProvider = firebase.auth.AuthProvider;
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  public authState: firebase.User = null;

  constructor(private user: UserService,
              private afAuth: AngularFireAuth) {
    this.authStateWatcher();
  }

  private authStateWatcher(): void {
    this.afAuth.authState.subscribe((authState) => {
      this.authState = authState;
      this.user.setUser(authState);
    });
  }

  private socialSignIn(provider: AuthProvider): Observable<firebase.auth.UserCredential> {
    return new Observable(subscriber => {
      this.afAuth.auth.signInWithPopup(provider)
        .then(response => subscriber.next(response))
        .catch(error => subscriber.error(error));
    });
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

  public registerWithLoginAndPassword({displayName, login, password}): Observable<firebase.auth.UserCredential> {
    return new Observable(subscriber => {
      this.afAuth.auth.createUserWithEmailAndPassword(login, password)
        .then(response => subscriber.next(response))
        .catch(error => subscriber.error(error));
    });
  }

  public logout(): Observable<void> {
    return new Observable(subscriber => {
      this.afAuth.auth.signOut()
        .then(response => {
          subscriber.next(response);
        })
        .catch(error => subscriber.error(error));
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

}
