import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RachelPage } from '../rachel/rachel';

@Component({
  selector: 'page-spotlight',
  templateUrl: 'spotlight.html'
})
export class SpotlightPage {

  constructor(public navCtrl: NavController) {
  }
  goToRachel(params){
    if (!params) params = {};
    this.navCtrl.push(RachelPage);
  }
}
