import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ManagePage } from '../manage/manage';
import { CongratulationsPage } from '../congratulations/congratulations';
import { NewGoalPage } from '../new-goal/new-goal';
import { LightLabPage } from '../light-lab/light-lab';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-my-light',
  templateUrl: 'my-light.html'
})
export class MyLightPage {

  constructor(public navCtrl: NavController,public authData: AuthProvider, public firebaseProvider: FirebaseProvider, public afd: AngularFireDatabase) {
    const authObserver = this.authData.afAuth.authState.subscribe(user => {
      var uid = user.uid;
      var goalName;
      this.firebaseProvider.getGoal(uid).subscribe(
        item => {
          console.log(item);
        }
      );
      // this.afd.object('/Goals/'+uid).subscribe(
      //   item => {
      //     this.currentGoal = item["goal"]["goalName"];
      //     console.log(item["goal"]["goalName"]);
      //     // this.currentGoal = item["goal"]["goalName"];
      //   }
      // );
      // // this.task1 =
      // // this.task2 =
      // // this.task3 =
      // // this.task4 =
      // // this.task5 =
    });

  }
  finishlight() {
    const authObserver = this.authData.afAuth.authState.subscribe(user => {
      var uid = user.uid;
      this.firebaseProvider.finishlight(uid);
    });
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
