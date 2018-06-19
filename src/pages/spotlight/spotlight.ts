import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RachelPage } from '../rachel/rachel';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-spotlight',
  templateUrl: 'spotlight.html'
})
export class SpotlightPage {

  constructor(public navCtrl: NavController, public authData: AuthProvider, public firebaseProvider: FirebaseProvider) {
  }
  goToRachel(params){
    if (!params) params = {};
    this.navCtrl.push(RachelPage);
  }

  like() {
    const authObserver = this.authData.afAuth.authState.subscribe(user => {
      if (user) {
        var uid = user.uid;
        this.firebaseProvider.like(uid);
      }
    });
  }
}
