import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { User } from './../../models/user.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { ChatPage } from '../chat/chat';
import { UserProvider } from '../../providers/user/user';
import { ChatProvider } from '../../providers/chat/chat';
import { Chat } from '../../models/chat.model';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users;
  chats;
  view: string = "chats";
  
  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public authService: AuthProvider,
    public userService: UserProvider,
    public chatService: ChatProvider,
    public menuCtrl: MenuController
  ) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewWillLoad(){
    this.users = this.userService.users;
    this.chats = this.chatService.chats;
    this.menuCtrl.enable(true, 'user-menu');
  }

  onSignUp(){
    this.navCtrl.push(SignUpPage);
  }

  onChatCreate(recipientUser: User){
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.chatService.getDeepChat(this.authService.auth.auth.currentUser.uid, recipientUser.$key)
          .first()
          .subscribe((chat: Chat[]) => {
            if(!chat){
              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

              let chat1 = new Chat('', timestamp, recipientUser.name, '', recipientUser.$key);
              this.chatService.create(chat1, this.authService.auth.auth.currentUser.uid, recipientUser.$key);

              let chat2 = new Chat('', timestamp, currentUser.name, '', this.authService.auth.auth.currentUser.uid);
              this.chatService.create(chat2, recipientUser.$key, this.authService.auth.auth.currentUser.uid);
            }
          });
      });

    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser,
      recipientUid: recipientUser.$key
    });
  }

  onChatOpen(chat: Chat): void {
    console.log(chat);
    let recipentUid: string = chat.uid;

    this.userService.getUserById(recipentUid)
      .first()
      .subscribe((user: User) => {
        console.log(user);
        this.navCtrl.push(ChatPage, {
          recipientUser: user,
          recipientUid: recipentUid
        });
      })
  }

  filterItens(event: any) {
    let searchTerm: string = event.target.value;

    if(searchTerm){
      switch(this.view){
        case "chats":
          this.chats = this.chats.map((chats: Chat[])=>{
            return chats.filter((chat: Chat)=>{
              return (chat.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
            });
          });
          break;
        case "users":
          this.users = this.users.map((users: User[])=>{
            return users.filter((user: User)=>{
              return (user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
            });
          });
          break;
      }
    } else {
      this.users = this.userService.users;
      this.chats = this.chatService.chats;
    }
  }

}
