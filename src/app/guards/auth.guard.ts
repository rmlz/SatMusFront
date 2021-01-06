import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    isLogged: Boolean;

     constructor(private router: Router, private authService: AuthService) { }

     canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        const requiresLogin = route.data.requiresLogin || false;
        if (requiresLogin) {
          if(this.authService.isAuthenticated()){
              return true;
          } else {
              this.router.navigate(['/login'])
          }
        }
      }
    }

    // canActivate(
    //     route: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot): boolean  | Observable<boolean> {
    //         if (this.authService.isLoggedIn()) {
    //             this.router.navigate([''])
    //             return true
    //         } else {
    //             this.router.navigate(['/login'])
    //             return true
    //         }
            
            
    //     }
    // }