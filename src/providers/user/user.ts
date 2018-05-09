import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from '../../models/user.model';
import { AuthProvider } from '../auth/auth';



@Injectable()
export class UserProvider extends BaseService {


  users: Observable<User[]>;
  currentUser: Observable<User>;
  userObject: AngularFireObject<User>;
  currentUserUid: string;

  constructor(
    public db: AngularFireDatabase,
    public http: Http,
    public authService: AuthProvider
  ) {
    super();

  }

  create(user:User, uid: string): Promise<void>{
    return this.db.object('/users/'+uid)
      .set(user)
      .catch(this.handlePromiseError);
  }

  userExists(username: string): Observable<boolean>{
    return this.db.list('/users', ref => ref.orderByChild("username").equalTo(username)
    ).valueChanges()
    .map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

  private setUsers(uidToExclude: string): void {
    this.users = this.mapListKeys<User>(
      this.db.list<User>('/users', 
        ref => ref.orderByChild('name')
      )
    )
    .map((users: User[]) => {      
      return users.filter((user: User) => user.$key != uidToExclude);
    });
  }

  getUserById(uid: string): Observable<User>{
    return this.db.object(`/users/${uid}`).valueChanges()
      .catch(this.handleObservableError);
  }

  syncUsers(): void{
    if(this.authService.auth.auth.currentUser){
      let uid = this.authService.auth.auth.currentUser.uid;
      this.currentUser = this.db.object<User>('/users/'+uid).valueChanges();
      this.userObject = this.db.object('/users/'+uid);
      this.setUsers(uid);
      this.currentUserUid = uid;
    }
  }

  edit(user: {name: string, username: string, photo: string}): Promise<void> {
    return this.userObject
      .update(user)
      .catch(this.handlePromiseError);
  }


}
