import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  public signInForm: FormGroup;
  
  constructor(
    public authService: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder, 
    public navParams: NavParams
  ) {

    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }); 
  }

  onSubmit() {
    let loading: Loading = this.showLoading();
    this.authService.signInWithEmail(this.signInForm.value)
      .then((isLogged: boolean) => {
        if(isLogged) {
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        }
      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  onSignUp() {
    this.navCtrl.push(SignUpPage);
  }

  onHome(){
    this.navCtrl.push(HomePage);
  }

}
