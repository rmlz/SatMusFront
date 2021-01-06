import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public user$ = this.authService.user;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router)
    {
      this.form = this.formBuilder.group( {
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  login() {
    const {email, password} = this.form.value;
    this.authService.login(email, password)
    .subscribe(
      success => this.router.navigate(['']),
      error => console.log(error.message)
    )
   };

  loginWithGoogle(){
    this.authService.loginWithGoogle().subscribe(
      success => this.router.navigate(['']),
      error => console.log(error.message)
    );
  }
  ngOnInit(): void {
   
  }

}
