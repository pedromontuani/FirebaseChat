import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
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
  filePhoto: File;
  uploadProgress: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider,
    public userService: UserProvider,
    public loadingCtrl: LoadingController
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
    let loading: Loading = this.showLoading();
    event.preventDefault();
    if(this.filePhoto){
      let uploadTask = this.userService.uploadPhoto(this.filePhoto, this.userService.currentUserUid);
      uploadTask.on('state_changed', (snahpshot: firebase.storage.UploadTaskSnapshot) => {
          
      }, (error: Error) => {
        console.log(error);
      }, () => {
        this.editUser(uploadTask.snapshot.downloadURL);
      });
    } else {
      this.editUser();
    }
    loading.dismiss();
  }

  private editUser(photoUrl?: string): void{
    this.userService.edit({
      name: this.currentUser.name,
      username: this.currentUser.username,
      photo: photoUrl || this.currentUser.photo || ''
    }).then(() => {
      this.canEdit = false;
      this.filePhoto = undefined;
      this.uploadProgress = 0;
    });
  }

  private showLoading(): Loading{
    let loading: Loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loading.present();
    return loading;
  }

  onPhoto(event){
    this.filePhoto = event.target.files[0];
  }
}
