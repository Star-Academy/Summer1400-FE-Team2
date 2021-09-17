import { Component, OnInit } from "@angular/core";
import Playlist from "src/app/models/Playlist";
import { EngineService } from "src/app/service/engine.service";
import { ActivatedRoute } from "@angular/router";
import { PlayerService } from "src/app/components/player/player.service";
@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.scss"],
})
export class PlaylistComponent implements OnInit {
  constructor(
    private _engine: EngineService,
    private _Activatedroute: ActivatedRoute,
    private _player: PlayerService
  ) {}
  public status: boolean = false;
  public playlistId: number = 0;
  public playlist: Playlist | null = null;
  playBtnSrc = "../assets/Icons/play-button.svg";
  isPlaying = this._player.autoPlay;  
  async ngOnInit() {    
    this.playBtnSrc = this.isPlaying
    ? "../assets/Icons/pause-button.svg"
    : "../assets/Icons/play-button.svg";
    this._Activatedroute.paramMap.subscribe((params) => {
      let playlist_id = params.get("id");
      if (playlist_id) {
        this.playlistId = parseInt(playlist_id);
        this.setPlaylist();
      }
    });        
    this._player.isPlaylistEnabled.subscribe((isPlaying: boolean) => {       
      this.playBtnSrc = isPlaying
        ? "../assets/Icons/pause-button.svg"
        : "../assets/Icons/play-button.svg";
      this.isPlaying = isPlaying;
    });
    // check this.....
   await this._player.setSongsList(this.playlistId);
  }

  setplaylist() {}
  async setPlaylist() {
    this.playlist = await this._engine.getPlaylist(this.playlistId);
  }

  onDetailsBtn() {
    this.status = !this.status;
  }

  // check this.....
  async onPlay() {
    if (this._player.isFirstPlay) {      
      await this._player.getPlaylistName(this.playlistId);
      this._player.isFirstPlay = false;
    }
    this.isPlaying = !this.isPlaying;    
    if (this.isPlaying) {
      this._player.playSong();      
      this.playBtnSrc = "../assets/Icons/pause-button.svg";
      this._player.isCurrentMusicEnabled.emit(true);
    } else {
      this._player.pauseSong();      
      this.playBtnSrc = "../assets/Icons/play-button.svg";
      this._player.isCurrentMusicEnabled.emit(false);
    }   
  }

  public async refresh() {
    this.playlist = await this._engine.getPlaylist(this.playlistId);
  }
}
