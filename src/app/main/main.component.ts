import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Music } from '../domains/Music';
import { MusicModel } from '../models/MusicModel';
import { MusicsService } from '../musics.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public user$ = this.authService.user;

  constructor(private musicsService: MusicsService, private authService: AuthService) {}

  music: MusicModel = new MusicModel();
  musics: Array<Music> = new Array();
  musicModel: Music = new Music();

  editField: string;

  ngOnInit(): void {
    this.callApi()
  }

  //Table update methods

  updateList(id: number, property: string, event: any){
    const editField = event.target.textContent
    this.musics[id][property] = editField
    console.log(editField)
    this.updateMusic(id, this.musics[id])
  }

  changeValue(id: number, property: string, event:any){
    this.editField = event.target.textContent
  }
  
  //Music API methods

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
