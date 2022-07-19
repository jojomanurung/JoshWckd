import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '@shared/interface/user/user';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$!: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private store: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.store.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  getUser(): Promise<firebase.User | null> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async emailSignUp(email: string, password: string) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user = credential.user;
    if (user) {
      this.updateUserData(user);
      // Need to Comment for checking email verified as Firebase can't redirect to other site except from firebase hosting
      // this.sendEmailVerification(user);
    }
  }

  async sendEmailVerification(user: firebase.User) {
    const returnUrl = { url: 'https://www.joshwckd.herokuapp.com/kanban' };
    // TODO : FIX email return url
    const emailVerification = user?.sendEmailVerification();
    return emailVerification;
  }

  async emailSignIn(email: string, password: string) {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    const user = credential.user;
    if (user) return this.updateUserData(user);
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    const user = credential.user;
    if (user) return this.updateUserData(user);
  }

  private updateUserData(user: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.store.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerId: user.providerId,
      permission: {
        create: true,
        read: true,
        update: true,
        delete: true
      },
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
