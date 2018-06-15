import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  Loading,
  AlertController, 
  NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { MyLightPage } from '../my-light/my-light';

@Component({
  selector: 'page-new-goal',
  templateUrl: 'new-goal.html'
})
export class NewGoalPage {

  public newGoalForm: FormGroup;
  public loading: Loading;
  isFirstGoal: boolean;

  constructor(public nav: NavController, public navParams: NavParams, public authData: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,public firebaseProvider: FirebaseProvider) {

    this.newGoalForm = formBuilder.group({
      name :[null, [Validators.required, Validators.minLength(2)]],
      item1: [null, [Validators.required, Validators.minLength(2)]],
      item2: [null, [Validators.required, Validators.minLength(2)]],
      item3: [null, [Validators.required, Validators.minLength(2)]],
      item4: [null, [Validators.required, Validators.minLength(2)]],
      item5: [null, [Validators.required, Validators.minLength(2)]],
    });

    this.isFirstGoal = navParams.get('isFirstGoal');
  }


  NewGoal(){
    if (!this.newGoalForm.valid){
      console.log(this.newGoalForm.value);
    } else {

      const authObserver = this.authData.afAuth.authState.subscribe(user => {
        var uid = user.uid;
        this.firebaseProvider.addGoal(uid, this.newGoalForm.value.name, this.isFirstGoal);
        this.firebaseProvider.addTasks(uid, this.newGoalForm.value.item1, this.newGoalForm.value.item2, this.newGoalForm.value.item3, this.newGoalForm.value.item4, this.newGoalForm.value.item5);
        
        this.nav.setRoot(MyLightPage);

      });
    }
  }

}
