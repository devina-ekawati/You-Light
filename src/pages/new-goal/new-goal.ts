import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LightLabPage } from '../light-lab/light-lab';

@Component({
  selector: 'page-new-goal',
  templateUrl: 'new-goal.html'
})
export class NewGoalPage {

  constructor(public navCtrl: NavController) {
  }
  goToLightLab(params){
    if (!params) params = {};
    this.navCtrl.push(LightLabPage);
  }
}
