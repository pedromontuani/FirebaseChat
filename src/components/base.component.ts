import { OnInit } from '@angular/core';
import { NavController, AlertController, App, MenuController } from 'ionic-angular';
import { AuthProvider } from '../providers/auth/auth';

import { SignInPage } from './../pages/sign-in/sign-in';

export abstract class BaseComponent implements OnInit {
    
    protected navCtrl: NavController;

    constructor (
        public alertCtrl: AlertController,
        public authService: AuthProvider,
        public app: App,
        public menuCtrl: MenuController

    ) {}

    ngOnInit(): void {
        this.navCtrl = this.app.getActiveNav();
    }

    onLogout(): void {
        this.alertCtrl.create({
            message: "Você deseja sair?",
            buttons: [
                {
                    text: "Sim",
                    handler: () => {
                        this.authService.logout()
                            .then(() => {
                                this.menuCtrl.enable(false, 'user-menu');
                                this.navCtrl.setRoot(SignInPage);
                            });
                    }
                },
                {
                    text: "Não"
                }
            ]
        }).present();
    }
}