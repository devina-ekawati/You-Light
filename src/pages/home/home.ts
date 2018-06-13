import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	Users: FirebaseListObservable<any[]>;
		newName = '';
		newMail = '';
		newPassword = '';
  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {
  this.Users = this.firebaseProvider.getUsers();
  }

  addUser() {
      this.firebaseProvider.addUser(this.newName,this.newMail,this.newPassword,"hometest");
      }
   removeUser(id) {
       this.firebaseProvider.removeUser(id);
         }
}
