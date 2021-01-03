import { Component, OnInit } from '@angular/core';
import { Music } from '../domains/Music';
import { MusicsService } from '../musics.service';

@Component({
  selector: 'app-music-table',
  templateUrl: './music-table.component.html',
  styleUrls: ['./music-table.component.css']
})
export class MusicTableComponent implements OnInit {

  musics: Array<Music> = new Array();
  constructor(private musicsService: MusicsService) { }

  ngOnInit(): void {
    this.callApi();
  }
  callApi(){
    this.musicsService.callApi().subscribe(musics => {
      this.musics = musics
    }, err => {
      console.log("Não foi possível receber os dados das músicas", err)
    })
  }
    
}
