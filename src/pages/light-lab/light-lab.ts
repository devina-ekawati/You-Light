import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-light-lab',
  templateUrl: 'light-lab.html'
})
export class LightLabPage {

  constructor(public navCtrl: NavController, public authData: AuthProvider, public firebaseProvider: FirebaseProvider) {
  }

  blinkMyLight() {
    const authObserver = this.authData.afAuth.authState.subscribe(user => {
      var uid = user.uid;
      this.firebaseProvider.blinkMyLight(uid);
    });
  }
  
}
