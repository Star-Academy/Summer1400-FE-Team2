import { Component, OnInit } from "@angular/core";
import Playlist from "src/app/models/Playlist";
import { EngineService } from "src/app/service/engine.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.scss"],
})
export class PlaylistComponent implements OnInit {
  constructor(private engin: EngineService,private _Activatedroute: ActivatedRoute) {}

   async ngOnInit() {
    this._Activatedroute.paramMap.subscribe((params) => {
      let playlist_id = params.get('id');
      if(playlist_id){
        this.setPlaylist(playlist_id);
      }
    })
  }

  playlist: Playlist | null = null;
  setplaylist() {}
  async setPlaylist(id:string){
    const playlist =await this.engin.getPlaylist(+id);
    this.playlist = playlist;
  }

  status: boolean = false;
  onDetailsBtn(){
    console.log("on edit button");
    this.status = !this.status;
  }
}

