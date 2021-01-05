import { Component, OnInit } from '@angular/core';
import { Music } from '../domains/Music';
import { MusicModel } from '../models/MusicModel';
import { MusicsService } from '../musics.service';

@Component({
  selector: 'app-lowbar',
  templateUrl: './lowbar.component.html',
  styleUrls: ['./lowbar.component.css']
})
export class LowbarComponent implements OnInit {

  constructor() { }

  
  ngOnInit(): void {
    
  }
}
