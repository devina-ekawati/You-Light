import { Component } from '@angular/core';
import { NavController, Loading, LoadingController } from 'ionic-angular';
import { ManagePage } from '../manage/manage';
import { CongratulationsPage } from '../congratulations/congratulations';
import { NewGoalPage } from '../new-goal/new-goal';
import { LightLabPage } from '../light-lab/light-lab';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/take'

@Component({
  selector: 'page-my-light',
  templateUrl: 'my-light.html'
})
export class MyLightPage {

  tasks: FirebaseListObservable<any[]>;
  items: any;
  goal: any;
  uid: string;
  taskStage: number;
  goalStage: number;
  goalName: string;
  loading: Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider, public firebaseProvider: FirebaseProvider, public afd: AngularFireDatabase, public loadingCtrl: LoadingController) {
    

    const authObserver = this.authData.afAuth.authState.subscribe(user => {
      this.uid = user.uid;
      this.tasks = this.firebaseProvider.getTasks(this.uid);
      this.goal = this.firebaseProvider.getGoal(this.uid);
      
      var goal = this.goal;
      goal.subscribe(
        item => {
          this.goalStage = item["goalStage"];
          this.taskStage = item["taskStage"];
        }
      );
    });
  }

  finishlight() {
    const authObserver = this.authData.afAuth.authState.subscribe(user => {
      var uid = user.uid;
      this.firebaseProvider.finishGoal(uid, this.goalStage + 1);
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

  CheckboxClicked(i, task: any, $event) {
    if (task.isFinished == true) {
      if (this.taskStage < 4) {
        this.taskStage += 1;
        this.firebaseProvider.updateTaskStage(this.uid, this.taskStage);
      }

      this.firebaseProvider.finishTask(this.uid, "item"+(i+1));
    }
  }
}
