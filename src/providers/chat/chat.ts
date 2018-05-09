import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base';
import { Chat } from './../../models/chat.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class ChatProvider extends BaseService{

  chats: Observable<Chat[]>

  constructor(
    public http: Http,
    public db: AngularFireDatabase,
    public authService: AuthProvider
  ) {
    super();
    this.setChats();
  }

  create(chat: Chat, uidSender: string, uidRecipient: string): Promise<void> {
    return this.db.object(`/chats/${uidSender}/${uidRecipient}`)
      .set(chat)
      .catch(this.handlePromiseError);
  }
  
  getDeepChat(uidSender: string, uidRecipient: string): Observable<Chat[]> {
    return this.db.object<Chat>(`/chats/${uidSender}/${uidRecipient}`).valueChanges()
      .catch(this.handleObservableError);
  }

  updateLastMessage(uidSender, uidRecipient, newMessage, timestamp): void {
    this.db.object(`/chats/${uidSender}/${uidRecipient}`).update({
      lastMessage: newMessage,
      timestamp: timestamp
    });
  }

  private setChats(): void {
    this.authService.auth.authState.subscribe((authState) => {
      if(authState) {
        this.chats = this.db.list<Chat>(`/chats/${authState.uid}`, ref => ref.orderByChild('timestamp'))
          .valueChanges().map((chats: Chat[]) => {
            return chats.reverse();
          });
      }
    });
  }

}
