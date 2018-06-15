import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ManagePage } from '../manage/manage';
import { CongratulationsPage } from '../congratulations/congratulations';
import { NewGoalPage } from '../new-goal/new-goal';
import { LightLabPage } from '../light-lab/light-lab';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-my-light',
  templateUrl: 'my-light.html'
})
export class MyLightPage {

  Goal;
  constructor(public navCtrl: NavController, public fbp: FirebaseProvider, public authPro : AuthProvider) {
    const authObserver = authPro.afAuth.authState.subscribe(user => {
      var id = user.uid;
      this.Goal= fbp.getGoalsbyID(id);
      
      } );
  }

  goToManage(params){
    if (!params) params = {};
    this.navCtrl.push(ManagePage);
  }goToCongratulations(params){
    if (!params) params = {};
    this.navCtrl.push(CongratulationsPage);
  }goToNewGoal(params){
    if (!params) params = {};
    this.navCtrl.push(NewGoalPage);
  }goToLightLab(params){
    if (!params) params = {};
    this.navCtrl.push(LightLabPage);
  }
}
