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
  public formSubmitted: boolean = false;
  public loginStatus = {
    msg: '',
    failed: false,
    success: false
}
  public user$ = this.authService.user;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router)
    {
      this.form = this.formBuilder.group( {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

  login() {
    this.loginStatus.msg = ''
    this.formSubmitted = true
    const {email, password} = this.form.value;
    this.authService.login(email, password)
    .subscribe(
      success => this.loginHasSucceeded(),
      error => this.loginHasFailed(error.message)
    )
   };

   loginHasSucceeded(){
    this.loginStatus.msg = "SUCESSO! Estamos te redirecionando!";
    this.loginStatus.failed = false;
    this.loginStatus.success = true;
    setTimeout(() =>
      this.router.navigate(['']),3000)
  }

   loginHasFailed(message: string){
     if (message == "The email address is badly formatted.") {
       this.loginStatus.msg = "Deu errado aí pai! Tente novamente!";
     }
     if (message == "The password is invalid or the user does not have a password."){
       this.loginStatus.msg = "Tu errou um ou o outro. Ou tu nem se cadastrou ainda!"
     }
     if (message == "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."){
      this.loginStatus.msg = "O acesso a essa conta foi desabilitado por excesso de tentativas. Agora só entra se resetar a senha. VALEU FALOU!"
     }
     if (message == 'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.'){
      this.loginStatus.msg = "O processo de autenticação falhou!"
     } else {
       this.loginStatus.msg = "Não foi possível completar a autenticação!"
     }
      this.loginStatus.failed = true;

   }

  loginWithGoogle(){
    this.authService.loginWithGoogle().subscribe(
      success => this.loginHasSucceeded(),
      error => this.loginHasFailed(error.message)
    );
  }
  ngOnInit(): void {
   
  }

  get email() { return this.form.get('email')}

  get password() { return this.form.get('password')}


}
