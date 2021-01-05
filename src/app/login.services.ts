import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class LoginService{
    user: Observable<firebase.User>

    constructor(public afAuth: AngularFireAuth, private router: Router) {
        this.user = afAuth.authState;
    }

    public login(mail:string, pass: string) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(mail, pass)

            .then((user) => {
                console.log(user)
                //localStorage['token'] = user.Id;
                //this.router.navigate(['']);
            })

            .catch((error) => {
                this.router.navigate(['/login']);
            })

            .catch((error) => {
                this.router.navigate(['/login']);
            });
        })
    }

    public logout() {
        return this.afAuth.auth.signOut();
    }
}