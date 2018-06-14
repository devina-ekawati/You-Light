import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
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

  constructor(public nav: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,public firebaseProvider: FirebaseProvider) {

    this.newGoalForm = formBuilder.group({
      name :[null, [Validators.required, Validators.minLength(2)]],
      item1: [null, [Validators.required, Validators.minLength(2)]],
      item2: [null, [Validators.required, Validators.minLength(2)]],
      item3: [null, [Validators.required, Validators.minLength(2)]],
    });
  }


  NewGoal(){
    if (!this.newGoalForm.valid){
      console.log(this.newGoalForm.value);
    } else {
      //   this.authData.signupUser(this.newGoalForm.value.email, this.newGoalForm.value.password)
      //   .then((userData) => {
      //     var uid = userData.uid;
      //     this.nav.setRoot(MyLightPage);
      //     //Function add Goal called here 
      //       this.firebaseProvider.addGoal(this.newGoalForm.value.name,this.newGoalForm.value.item1,this.newGoalForm.value.item2, this.newGoalForm.value.item3, uid);
      //     //create user in database. create user from firebasedb provider with : this.newGoalForm.value.name
      //   }, (error) => {
      //   this.loading.dismiss().then( () => {
      //     var errorMessage: string = error.message;
      //       let alert = this.alertCtrl.create({
      //         message: errorMessage,
      //         buttons: [
      //           {
      //             text: "Ok",
      //             role: 'cancel'
      //           }
      //         ]
      //       });
      //     alert.present();
      //   });
      // });

      // this.loading = this.loadingCtrl.create({
      //   dismissOnPageChange: true,
      // });
      // this.loading.present();
      
      const authObserver = this.authData.afAuth.authState.subscribe(user => {
        var uid = user.uid;
        console.log(uid);
        this.firebaseProvider.addGoal(this.newGoalForm.value.name, this.newGoalForm.value.item1, this.newGoalForm.value.item2, this.newGoalForm.value.item3, uid);
        this.nav.setRoot(MyLightPage);

      });
    }
  }

}
