import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard"

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { MidbarComponent } from './midbar/midbar.component';
import { LowbarComponent } from './lowbar/lowbar.component';
import { MainComponent } from './main/main.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { MusicsService} from '../app/musics.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component'

import { AuthGuard } from "./guards/auth.guard";

import { AuthService } from "./auth.service";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';




export const firebaseConfig = {
  apiKey: "AIzaSyCwrs-Qty8lb8sLhavq_ko_bP8-rh4g_xk",
  authDomain: "satmusic-2f56e.firebaseapp.com",
  databaseURL: "https://satmusic-2f56e-default-rtdb.firebaseio.com",
  projectId: "satmusic-2f56e",
  storageBucket: "satmusic-2f56e.appspot.com",
  messagingSenderId: "858443734630",
};

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LoginComponent,
    MidbarComponent,
    LowbarComponent,
    MainComponent,
    NotFoundComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [HttpClientModule, MusicsService, AuthGuard, AuthService, 
    AngularFireModule, AngularFireAuth, AngularFireAuthModule, AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
