import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ManagePage } from '../pages/manage/manage';
import { CongratulationsPage } from '../pages/congratulations/congratulations';
import { NewGoalPage } from '../pages/new-goal/new-goal';
import { LightLabPage } from '../pages/light-lab/light-lab';
import { SpotlightPage } from '../pages/spotlight/spotlight';
import { RachelPage } from '../pages/rachel/rachel';
import { DiscoverPage } from '../pages/discover/discover';
import { InboxPage } from '../pages/inbox/inbox';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { SettingsPage } from '../pages/settings/settings';

import { MyLightPage } from '../pages/my-light/my-light';
import { HomePage } from '../pages/home/home'
import { SignUpPage } from '../pages/account/signup';
import { SignInPage } from '../pages/signin/signin';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any;
  // isAccountMenuToggled: boolean;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth, public authData: AuthProvider) {
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = MyLightPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = SignInPage;
        authObserver.unsubscribe();
      }
    });

    // this.isAccountMenuToggled = false;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  // toggleGroup() {
  //   if (this.isAccountMenuToggled) {
  //     this.isAccountMenuToggled = false;
  //   } else {
  //     this.isAccountMenuToggled = true;
  //   }
  // }

  goToHome(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  } goToMyLight(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(MyLightPage);
  } goToManage(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(ManagePage);
  } goToCongratulations(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(CongratulationsPage);
  } goToNewGoal(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(NewGoalPage);
  } goToLightLab(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(LightLabPage);
  } goToSpotlight(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(SpotlightPage);
  } goToRachel(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(RachelPage);
  } goToDiscover(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(DiscoverPage);
  } goToSignUp(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(SignUpPage);
  } goToSignIn(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(SignInPage);
  } goToInbox(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(InboxPage);
  } goToMyProfile(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(MyProfilePage);
  } goToSettings(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(SettingsPage);
  }

  logout() {
    this.navCtrl.setRoot(SignInPage);
    this.authData.logoutUser();
  }
}
