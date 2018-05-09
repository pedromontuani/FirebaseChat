import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user.model';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  
  currentUser: User;
  canEdit: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider,
    public userService: UserProvider
  ) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewWillLoad() {
    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  onSubmit(event: Event): void{
    event.preventDefault();
    this.editUser();
  }

  private editUser(photoUrl?: string): void{
    this.userService.edit({
      name: this.currentUser.name,
      username: this.currentUser.username,
      photo: photoUrl || this.currentUser.photo || ''
    }).then(() => {
      this.canEdit = false;
    });
  }

}
