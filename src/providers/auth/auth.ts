import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase' ;

@Injectable()
export class AuthProvider {

  user_status = false;
  constructor(public afAuth: AngularFireAuth) {}

  loginUser(Email: string, Password: string): firebase.Promise<any> {
    this.user_status = true;
    return this.afAuth.auth.signInWithEmailAndPassword(Email, Password);
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  
  logoutUser(): firebase.Promise<any> {
    this.user_status = false;
    return this.afAuth.auth.signOut();
    
  }

  signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    this.user_status = true;
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

  get_user_status() {
    return this.user_status;
  } 
  
  set_user_status(user_status) {
    this.user_status = user_status;
  }


}