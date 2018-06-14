import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})


export class MyProfilePage {

  User: Observable<any[]>;
  Goals;

  Name: string;
  mail: string;
  Password: string;

  constructor(public navCtrl: NavController, public fbp: FirebaseProvider, public authPro : AuthProvider) {

    
    /*this.authPro.afAuth.authState.take(1).subscribe(auth => {

      this.fbp.afd.object(`User/${auth.uid}`).get({
          Name: this.Name,
          mail: this.mail,
          Password: this.Password
      });
      })*/
 
      //Here should begetMyUserInfo from firebase.ts but does not work asynchronously

    const authObserver = authPro.afAuth.authState.subscribe(user => {
      var id = user.uid;
      this.User = fbp.getUserByID(id);
      this.Goals= fbp.getMyGoals(id);
      console.log(this.Goals);
      }
    );

    
  };

}