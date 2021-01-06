import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PatternValidator } from '@angular/forms';
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
  public submitErrors: Array<string> = []

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

  musicErrorTreatment(){
    let keyName: string;
    let canSubmit: boolean = true;
    let yearRegex: RegExp = /^\d{4}$/

    //checks if Music object is empty
    if (Object.keys(this.music).length < 4){
      this.submitErrors.push('Sua MELHOR MÚSICA tem que ter todos os campos preenchidos mano! 😁')
      canSubmit = false;
      console.log(this.submitErrors)
    }
    // checks values inside each key of Music Object
    Object.keys(this.music)
     .forEach((key) => {
         switch(key) {
           case 'name':
             keyName = 'Nome da Música';
             break;

            case 'bandOrSinger':
              keyName = 'Cantor ou Banda';
              break;

            case 'year':
              keyName = 'Ano da Música';
              break;

            case 'album':
              keyName = 'Álbum';
              break;
         }
         
         // checks if text > 15
         if (this.music[key].length > 30 && key != 'year'){
           this.submitErrors.push(`O campo ${keyName} não pode conter mais de 30 caracteres! Tu quer quebrar minha tela cara?😤`);
           this.music[key] = ''
           canSubmit = false;
         }

         if (key == 'year' && !this.music[key].toString().match(yearRegex)) {
          this.submitErrors.push(`O campo ${keyName} precisa estar no padrão YYYY 😒`);
          this.music[key] = 0
          canSubmit = false;
         }
      })

      if (canSubmit) {
        this.submitErrors.push('SUCESSO!! OLHA A SUA MÚSICA NA NOSSA LISTA!💖')
        setTimeout(() => {
          this.submitErrors.length = 0
        },3000)
      }

      return canSubmit
  }

  sendMusic() {
    this.submitErrors.length = 0
    if(this.musicErrorTreatment()){
      //console.log(this.music)
      this.musicsService.sendMusic(this.music).subscribe(music => {
        this.callApi()
      }, err => {
        console.log('Erro ao cadastrar música', err)
      })
      this.music = new MusicModel()
    }
    
    
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
