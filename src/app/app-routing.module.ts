import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const redirectLoggedInToMain = () => redirectLoggedInTo([''])

const routes: Routes = [  {
  path: '' , component: MainComponent, data: { authGuardPipe: redirectUnauthorizedToLogin }, canActivate: [AngularFireAuthGuard]},
{
  path: 'login', component: LoginComponent,
},
{ path: 'register', component: RegisterComponent, data: { authGuardPipe: redirectLoggedInToMain }, canActivate: [AngularFireAuthGuard]},
{ path: '**', component: NotFoundComponent
},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


