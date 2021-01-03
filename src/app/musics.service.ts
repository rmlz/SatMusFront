import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MusicsService {

  constructor(private http: HttpClient) { }

  callApi(): Observable<any>{
    return this.http.get("http://localhost:8080/api/musics/");
  }
}
