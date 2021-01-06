import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;
  public formSubmitted: boolean = false;
  public submitStatus = {
    msg: '',
    failed: false,
    success: false,
  } 
  public user$ = this.authService.user;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router)
    {
      this.form = this.formBuilder.group( {
        email: ['', [Validators.required, Validators.email]],
      });
    }

  forgotPass() {
    this.submitStatus.msg = ''
    this.formSubmitted = true
    const{email} = this.form.value;
    console.log(email, 'email')
    this.authService.forgotPass(email)
    .subscribe(
      success => this.submitHasSucceeded(),
      error => this.submitHasFailed(error.message)
    )
   };

   submitHasSucceeded(){
     this.submitStatus.msg = "SUCESSO! Verifique a caixa de entrada do email";
     this.submitStatus.failed = false;
     this.submitStatus.success = true;
     setTimeout(() =>
       this.router.navigate(['login']),3000)
   }

   submitHasFailed(message: string){
     if (message == "The email address is badly formatted.") {
       this.submitStatus.msg = "Deu errado aí pai! Tente novamente!";
     }
     if (message == "The password is invalid or the user does not have a password."){
       this.submitStatus.msg = "Tu errou um ou o outro. Ou tu nem se cadastrou ainda!"
     }
     if (message == "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."){
       this.submitStatus.msg = "O acesso a essa conta foi desabilitado por excesso de tentativas. Agora só entra se resetar a senha. VALEU FALOU!"
     }
     else {
       this.submitStatus.msg = "Não foi possível completar a requisição, verifique os dados e tente novamente! Vai dar certo!";
     }
     
     this.submitStatus.failed = true;
   }

  ngOnInit(): void {
   
  }

  get email() { return this.form.get('email')}


}
