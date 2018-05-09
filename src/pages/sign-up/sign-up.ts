import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/first';

import { UserProvider } from './../../providers/user/user';
import { AuthProvider } from './../../providers/auth/auth';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  public signUpForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public userService: UserProvider,
    public navParams: NavParams) {

    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  onSubmit() {
    let loading: Loading = this.showLoading();
    let formUser = this.signUpForm.value;

    this.userService.userExists(formUser.username)
      .first()
      .subscribe((userExists: boolean) => {
        if(!userExists){
          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then(() =>{
            delete formUser.password;
            let uid = this.authService.auth.auth.currentUser.uid;
            this.userService.create(formUser, uid).then(() => {
              console.log("Usuário cadastrado");
              this.userService.syncUsers();
              loading.dismiss();
              this.navCtrl.setRoot(HomePage);
            }).catch((error: any) => {
              console.log(error);
              loading.dismiss();
              this.showAlert(error);
            });
          }).catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
          });
          
        } else {
          loading.dismiss();
          this.showAlert('O usuário "'+formUser.username+'" já existe');
        }
      });

  }

  private showLoading(): Loading{
    let loading: Loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loading.present();
    return loading;
  }

  private showAlert(message: string){
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
