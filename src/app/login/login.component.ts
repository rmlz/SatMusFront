import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mail: string;
  pass: string;

  constructor(private loginService: LoginService) {
    }
  logOn(mail, pass) {
    console.log(mail)
    console.log(pass)
    //this.loginService.login(mail, pass)
   }

  ngOnInit(): void {
  }

}
