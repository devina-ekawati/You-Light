import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RachelPage } from '../rachel/rachel';

@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html'
})
export class InboxPage {

  constructor(public navCtrl: NavController) {
  }
  goToRachel(params){
    if (!params) params = {};
    this.navCtrl.push(RachelPage);
  }
}
