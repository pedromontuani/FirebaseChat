import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule, FirebaseAppConfig} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from './../pages/sign-in/sign-in';
import { UserProfilePage } from './../pages/user-profile/user-profile';

import { UserProvider } from '../providers/user/user';
import { HttpModule } from '@angular/http';
import { AuthProvider } from '../providers/auth/auth';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header';
import { ChatPage } from '../pages/chat/chat';
import { ChatProvider } from '../providers/chat/chat';
import { MessageProvider } from '../providers/message/message';
import { MsgBoxComponent } from '../components/msg-box/msg-box';
import { UserInfoComponent } from '../components/user-info/user-info';
import { UserMenuComponent } from '../components/user-menu/user-menu';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDom-hLWDyDcXRlKTseO3cQ_8T96k1vxCw",
  authDomain: "chat-firebase-with-ionic.firebaseapp.com",
  databaseURL: "https://chat-firebase-with-ionic.firebaseio.com",
  storageBucket: "chat-firebase-with-ionic.appspot.com",
  messagingSenderId: "488202225585"
};

@NgModule({
  declarations: [
    MyApp,
    ChatPage,
    HomePage,
    SignUpPage,
    SignInPage,
    CustomLoggedHeaderComponent,
    MsgBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    HomePage,
    SignUpPage,
    SignInPage,
    UserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider,
    ChatProvider,
    MessageProvider
  ]
})
export class AppModule {}
