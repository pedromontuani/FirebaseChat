import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/sign-in/sign-in';
import { AuthProvider } from '../providers/auth/auth';
import { User } from '../models/user.model';
import { UserProvider } from '../providers/user/user';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  currentUser: User;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    authService: AuthProvider,
    userService: UserProvider
  ) {

    authService.auth.authState.subscribe((authUser: firebase.User) => {
      if (authUser) {
        userService.syncUsers();
        this.rootPage = HomePage;
        userService.userObject.valueChanges()
          .subscribe((user: User) => {
            this.currentUser = user;
          });
      } else {
        this.rootPage = SignInPage;
      }
    });

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}

