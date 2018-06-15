import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { EmailValidator } from '../../validators/email';
import { MyLightPage } from '../my-light/my-light';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignUpPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public nav: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,public firebaseProvider: FirebaseProvider) {

    this.signupForm = formBuilder.group({
      name :[null, [Validators.required, Validators.minLength(2)]],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
        this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
        .then((userData) => {
          var uid = userData.uid;
          this.nav.setRoot(MyLightPage);
          this.firebaseProvider.addUser(this.signupForm.value.name,this.signupForm.value.email,this.signupForm.value.password, uid);
          this.firebaseProvider.initiateUserFeatures(uid);
          //create user in database. create user from firebasedb provider with : this.signupForm.value.name
        }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}