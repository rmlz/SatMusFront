import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { MusicsService} from '../app/musics.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from "./guards/auth.guard";
import { LoginService } from "./login.services";
import { MidbarComponent } from './midbar/midbar.component';
import { LowbarComponent } from './lowbar/lowbar.component';
import { MainComponent } from './main/main.component';

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
    MainComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [HttpClientModule, MusicsService, AuthGuard, LoginService, 
    AngularFireModule, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
