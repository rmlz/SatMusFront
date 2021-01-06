import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  public isLoggedIn: Boolean;
  public burguerStatus:Boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService) {
      authService.isAuthenticated()
        .subscribe(
          success => this.isLoggedIn = success)
  }   

  ngOnInit(): void {
  }

  logOut(){
    console.log("LOGGING OUT")
    this.authService.logout()
    .subscribe(
      success => this.router.navigate(['/login']),
      error => alert(error))
  }
  
  onClickNavBurguer(){
    this.burguerStatus = !this.burguerStatus
  }


}
