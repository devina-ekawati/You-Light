import { Component } from '@angular/core';
import { NewGoalPage } from '../new-goal/new-goal';
import { LightLabPage } from '../light-lab/light-lab';
import { MyLightPage } from '../my-light/my-light';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import {
  NavController,
  LoadingController,
  Loading,
  AlertController,
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
//import { MyLightPage } from '../my-light/my-light';
import { EmailValidator } from '../../validators/email';
import { SignUpPage }  from '../account/signup';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})

export class SignInPage {
  
  public loginForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,public firebaseProvider: FirebaseProvider) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  goToNewGoal(params){
    if (!params) params = {};
    this.navCtrl.push(NewGoalPage);
  }

  goToLightLab(params){
    if (!params) params = {};
    this.navCtrl.push(LightLabPage);
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.navCtrl.setRoot(MyLightPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
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

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  createAccount(){
    this.navCtrl.push(SignUpPage);
  }

  logOut(){
    // ask validation
    this.authData.logoutUser();
  }

  get_user_status(){
    return this.authData.get_user_status();
 }
}
