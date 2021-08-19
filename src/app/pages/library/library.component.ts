import { Component, OnInit } from '@angular/core';
import Playlist from 'src/app/models/Playlist';
import { EngineService } from 'src/app/service/engine.service';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor(private engineService:EngineService) { }

  public playlists:any=[];
  
  async ngOnInit(){
    this.playlists= await this.engineService.getAllPlaylist(localStorage.getItem('token')||'');
    console.log(this.playlists);
  }

}
