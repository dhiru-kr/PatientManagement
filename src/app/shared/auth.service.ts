import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated:boolean=false;
  user:Observable<any>;
  constructor(private http: HttpClient,private firestore: AngularFirestore) { }

  getlogin(user:User) : Observable<any[]>{
    debugger;
    this.isAuthenticated=false;
    this.user = this.firestore.collection('login').snapshotChanges();
    return this.user;
    // return this.firestore.collection('login',ref => ref.where('email', '==', user.email.toString()).where('Password', '==', user.Password.toString())).get();
  }
}