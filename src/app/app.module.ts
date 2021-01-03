import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { MusicTableComponent } from './music-table/music-table.component';
import {MusicsService} from '../app/musics.service';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    MusicTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, MusicsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
