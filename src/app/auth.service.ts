import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
   }

  loginWithGoogle(){
    return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
    }

  login(email, password) :Observable<any>{
    console.log(email, password)
      return from(this.afAuth.signInWithEmailAndPassword(email, password))
  }
  
  logout(){
    return from(this.afAuth.signOut())
  }

  register(email, password){
    return from(this.afAuth.createUserWithEmailAndPassword(email,password))
  }

  isAuthenticated(): Observable<boolean> {
    return this.user.pipe(map(user => user && user.uid !== undefined))
  }

}