import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewGoalPage } from '../new-goal/new-goal';
import { LightLabPage } from '../light-lab/light-lab';

@Component({
  selector: 'page-congratulations',
  templateUrl: 'congratulations.html'
})
export class CongratulationsPage {

  constructor(public navCtrl: NavController) {
  }
  goToNewGoal(params){
    if (!params) params = {};
    this.navCtrl.push(NewGoalPage);
  }goToLightLab(params){
    if (!params) params = {};
    this.navCtrl.push(LightLabPage);
  }
}
