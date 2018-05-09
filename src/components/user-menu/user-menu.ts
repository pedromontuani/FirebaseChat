import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.model';
import { UserProfilePage } from '../../pages/user-profile/user-profile';


@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent extends BaseComponent{

  @Input('user') currentUser: User;
  
  constructor(
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public app: App,
    public menuCtrl: MenuController,
    public userService: UserProvider
  ) {
    super(alertCtrl, authService, app, menuCtrl);
  }

  onProfile() {
    this.navCtrl.push(UserProfilePage);
  }

}
