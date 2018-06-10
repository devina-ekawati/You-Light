import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MyLightPage } from '../pages/my-light/my-light';
import { SpotlightPage } from '../pages/spotlight/spotlight';
import { DiscoverPage } from '../pages/discover/discover';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { InboxPage } from '../pages/inbox/inbox';
import { LightLabPage } from '../pages/light-lab/light-lab';
import { SettingsPage } from '../pages/settings/settings';
import { RachelPage } from '../pages/rachel/rachel';
import { ManagePage } from '../pages/manage/manage';
import { CongratulationsPage } from '../pages/congratulations/congratulations';
import { NewGoalPage } from '../pages/new-goal/new-goal';
import { AccountPage } from '../pages/account/account';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import { FirebaseProvider } from '../providers/firebase/firebase';

const firebaseConfig = {
        apiKey: "AIzaSyDeEyNKZa_rjBJgmgnexmG3tAVg7onKYfg",
        authDomain: "alight-1e56e.firebaseapp.com",
        databaseURL: "https://alight-1e56e.firebaseio.com",
        projectId: "alight-1e56e",
        storageBucket: "alight-1e56e.appspot.com",
        messagingSenderId: "645551985678"
 };
 
 

@NgModule({
  declarations: [
    MyApp,
    MyLightPage,
    SpotlightPage,
    DiscoverPage,
    MyProfilePage,
    InboxPage,
    LightLabPage,
    SettingsPage,
    RachelPage,
    ManagePage,
    CongratulationsPage,
    NewGoalPage,
    AccountPage
  ],
  imports: [
    BrowserModule,
	    IonicModule.forRoot(MyApp),
		HttpModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyLightPage,
    SpotlightPage,
    DiscoverPage,
    MyProfilePage,
    InboxPage,
    LightLabPage,
    SettingsPage,
    RachelPage,
    ManagePage,
    CongratulationsPage,
    NewGoalPage,
    AccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	 FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})
export class AppModule {}
