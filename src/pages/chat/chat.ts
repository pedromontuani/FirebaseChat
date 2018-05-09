import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user.model';
import { UserProvider } from '../../providers/user/user';
import { Message } from '../../models/message.model';
import { MessageProvider } from '../../providers/message/message';
import { AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ChatProvider } from '../../providers/chat/chat';
import { Content } from 'ionic-angular/components/content/content';

@IonicPage()
@Component({ 
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  messages: AngularFireList<Message>;
  messagesList: Observable<Message[]>;
  pageTitle: string;
  sender: User;
  recipient: User;
  recipientUid: string;
  senderUid: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthProvider,
    public userService: UserProvider,
    public msgService: MessageProvider,
    public chatService: ChatProvider
  ) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewWillLoad(){
    this.recipient = this.navParams.get('recipientUser');
    this.recipientUid = this.navParams.get('recipientUid');
    this.pageTitle = this.recipient.name;
    let doSubscription = () => {
      this.messagesList.subscribe(() => {
        this.scrollToBottom();
      });
    }

    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;
      });
      this.senderUid = this.userService.currentUserUid;
      
      this.messages = this.msgService
        .getMessages(this.userService.currentUserUid, this.recipientUid);
      
      this.messagesList = this.msgService.mapListKeys<Message>(this.messages);

      this.messagesList.first().subscribe((messages: Message[]) => {
        if(messages.length == 0) {
          this.messages = this.msgService
            .getMessages(this.recipientUid, this.userService.currentUserUid);
            doSubscription();
        }
        this.messagesList = this.msgService.mapListKeys<Message>(this.messages);
        doSubscription();
      });

  }

  ionViewDidLoad(){

  }

  sendMessage(newMessage: string): void{
    if(newMessage){
      let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;
      this.msgService.createMessage(new Message(
        this.userService.currentUserUid, newMessage, timestamp
      ), this.messages).then(() => {
        this.chatService.updateLastMessage(
          this.userService.currentUserUid, 
          this.recipientUid, 
          newMessage, 
          timestamp
        );
        this.chatService.updateLastMessage(
          this.recipientUid, 
          this.userService.currentUserUid, 
          newMessage, 
          timestamp
        );
      });
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if(this.content._scroll){
        this.content.scrollToBottom(50);
      }
    }, 100);
  }

}
