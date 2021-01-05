import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log(localStorage['token'], 'token');
        console.log("VALIDATE");

        if (localStorage['token'] == undefined) {
            this.router.navigate(['/login'])
        }

        console.log(localStorage['token'] != null);

        if (localStorage['token'] != null) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }

    }

}