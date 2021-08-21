import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import Song from "src/app/models/SongModal";
import { EngineService } from "src/app/service/engine.service";
import { Inject } from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import Playlist from "src/app/models/Playlist";
@Component({
  selector: "app-add-playlist",
  templateUrl: "./add-playlist.component.html",
  styleUrls: ["./add-playlist.component.scss"],
  providers: [],
})
export class AddPlaylistComponent implements OnInit {
  constructor(
    public _dialog: MatDialog,
    private _engine: EngineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public song: Song | null = null;
  public playlists: Array<Playlist> = [];
  async ngOnInit() {
    this.playlists = await this._engine.getAllPlaylist();
  }

  public openDialog(song: Song) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      song: song,
    };
    this._dialog.open(AddPlaylistComponent, dialogConfig);
  }

  public async addToSelectedPlaylist(id: number) {
    let success = await this._engine.postAddSong(id, this.data.song.id);
    if (success) {
      this._dialog.closeAll();
    }
  }
}
