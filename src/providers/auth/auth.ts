import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase' ;

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {}

  loginUser(Email: string, Password: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(Email, Password);
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  
  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

}