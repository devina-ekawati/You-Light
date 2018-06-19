import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-rachel',
  templateUrl: 'rachel.html'
})
export class RachelPage {

  constructor(public navCtrl: NavController, public authData: AuthProvider, public firebaseProvider: FirebaseProvider) {
  }
  
  follow() {
    const authObserver = this.authData.afAuth.authState.subscribe(user => {
      if (user) {
        var uid = user.uid;
        this.firebaseProvider.follow(uid);
      }
    });
  }
}
