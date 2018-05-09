import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {


  @Input() title: string;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, app, menuCtrl);
  }

}
