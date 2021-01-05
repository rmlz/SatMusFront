import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'
import { MusicModel } from './models/MusicModel';
import { Music } from './domains/Music';

@Injectable({
  providedIn: 'root'
})
export class MusicsService {

  private clickSource = new BehaviorSubject(false)
  isClicked = this.clickSource.asObservable()

  constructor(private http: HttpClient) { }

  callApi(): Observable<Music[]>{
    return this.http.get<Music[]>("http://localhost:8080/api/musics/");
  }

  sendMusic(music: MusicModel): Observable<Music>{
    return this.http.post<Music>("http://localhost:8080/api/music/", music)
  }

  updateMusic(id: number, music: MusicModel): Observable<Music>{
    var musicUpdate = {"id": id, ...music}
    return this.http.put<Music>("http://localhost:8080/api/music/", musicUpdate)

  }

  deleteMusic(music: Music): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
      body: music
    }
    return this.http.delete<Music>("http://localhost:8080/api/music/", options)
  } 
}
