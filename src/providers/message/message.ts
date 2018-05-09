import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Message } from '../../models/message.model';
import { UserProvider } from '../user/user';
import { BaseService } from '../base/base';
import { AngularFireList } from 'angularfire2/database';

@Injectable()
export class MessageProvider extends BaseService{

  constructor(
    public http: Http,
    public userService: UserProvider
  ) {
    super();
  }

  createMessage(message: Message, listMessages: AngularFireList<Message>): Promise<void> {
    return Promise.resolve(listMessages.push(message));
  }

  getMessages(uidSender: string, uidRecipient: string): AngularFireList<Message>{
    return this.userService.db.list(`/messages/${uidSender}-${uidRecipient}`, 
      ref => ref.orderByChild("timestamp").limitToLast(30));
  }

}
