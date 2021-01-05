import { Component, HostListener, OnInit } from '@angular/core';
import { Music } from '../domains/Music';
import { MusicModel } from '../models/MusicModel';
import { MusicsService } from '../musics.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  music: MusicModel = new MusicModel();
  musics: Array<Music> = new Array();
  musicModel: Music = new Music();
  isSendBtnClicked: Boolean;

  constructor(private musicsService: MusicsService) { }

  ngOnInit(): void {
    this.callApi()
  }

  sendMusic() {
    
    console.log(this.music)
    this.musicsService.sendMusic(this.music).subscribe(music => {
      this.callApi()
    }, err => {
      console.log('Erro ao cadastrar música', err)
    })
    this.music = new MusicModel()
  }

  callApi(){
    this.musicsService.callApi().subscribe(musics => {
      this.musics = musics
    }, err => {
      console.log("Não foi possível receber os dados das músicas", err)
    })
  }

  updateMusic(id:number, updatedMusic: MusicModel){
    this.musicsService.updateMusic(id, updatedMusic).subscribe(music => {
      this.musicModel = music
      this.callApi()
    }, err => {
      console.log("Não foi possível atualizar os dados da música", err)
    })
  }
  
  deleteMusic(music: Music){
    this.musicsService.deleteMusic(music).subscribe(music => {
      this.callApi()},
      err => {console.log("Não foi possível deletar os dados da música", err)}
    )
  }
}
