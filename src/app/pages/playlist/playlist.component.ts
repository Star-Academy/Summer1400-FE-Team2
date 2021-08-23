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

  async ngOnInit() {
    this._Activatedroute.paramMap.subscribe((params) => {
      let playlist_id = params.get("id");
      if (playlist_id) {
        this.playlistId = parseInt(playlist_id);
        this.setPlaylist();
      }
    });
  }

  setplaylist() {}
  async setPlaylist() {
    this.playlist = await this._engine.getPlaylist(this.playlistId);
  }

  onDetailsBtn() {
    this.status = !this.status;
  }

  async onPlay() {
    await this._player.getPlaylistName(this.playlistId);
  }

  public async refresh() {
    this.playlist = await this._engine.getPlaylist(this.playlistId);
  }
}
