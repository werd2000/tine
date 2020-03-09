import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth,
  ) { }

  // =====================================================================
  // Login normal: usuarios y password
  // =====================================================================
  loginWhithEmail( email: string, password: string ) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  registerWithEmail( email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  getStatus() {
    return this.afAuth.authState;
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

  // =====================================================================
  // Login con Google
  // =====================================================================
  loginWhithGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
