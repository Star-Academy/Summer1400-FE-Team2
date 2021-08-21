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
  constructor(
    private _engine: EngineService,
    private _Activatedroute: ActivatedRoute
  ) {}
  public status: boolean = false;

  async ngOnInit() {
    this._Activatedroute.paramMap.subscribe((params) => {
      let playlist_id = params.get("id");
      if (playlist_id) {
        this.setPlaylist(playlist_id);
      }
    });
  }

  playlist: Playlist | null = null;
  setplaylist() {}
  async setPlaylist(id: string) {
    const playlist = await this._engine.getPlaylist(+id);
    this.playlist = playlist;
  }

  onDetailsBtn() {
    this.status = !this.status;
  }
}
