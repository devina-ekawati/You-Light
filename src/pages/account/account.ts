import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewGoalPage } from '../new-goal/new-goal';
import { LightLabPage } from '../light-lab/light-lab';
import { FirebaseProvider } from './../../providers/firebase/firebase';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  
  newName = '';
  newMail = '';
  newPassword = '';

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {

  }

  goToNewGoal(params){
    if (!params) params = {};
    this.navCtrl.push(NewGoalPage);
  }

  goToLightLab(params){
    if (!params) params = {};
    this.navCtrl.push(LightLabPage);
  }

  addUser() {
    this.firebaseProvider.addUser(this.newName, this.newMail, this.newPassword);
    this.navCtrl.push(NewGoalPage);
  }
}
