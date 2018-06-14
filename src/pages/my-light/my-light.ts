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

  items: any[];
  uid: string;
  taskStage: number;

  constructor(public navCtrl: NavController,public authData: AuthProvider, public firebaseProvider: FirebaseProvider, public afd: AngularFireDatabase) {
    const authObserver = this.authData.afAuth.authState.subscribe(user => {
      this.uid = user.uid;
      this.firebaseProvider.getGoal(this.uid).subscribe(
        item => {
          console.log(item);
        }
      );
    });

    this.taskStage = 0;

    this.items = [
      {
        "name": "item1",
        "value": false,
      },
      {
        "name": "item2",
        "value": false,
      },
      {
        "name": "item3",
        "value": false,
      },
      {
        "name": "item4",
        "value": false,
      },
      {
        "name": "item5",
        "value": false,
      }
    ];
    console.log(this.items);
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

  CheckboxClicked(item: any, $event) {
    console.log('CheckboxClicked for ' + item.name + ' with value ' + item.value);
    this.taskStage += 1;
    console.log(this.taskStage);
    this.afd.object('/Goals/' + this.uid).update({ 'taskStage': this.taskStage });
  }
}
