import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import Song from "src/app/models/SongModal";
import { EngineService } from "src/app/service/engine.service";
import { ToastService } from "../../toast/toast.service";
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
    public dialog: MatDialog,
    private engine: EngineService,
    private toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public song: Song | null = null;
  public playlists: Array<Playlist> = [];
  async ngOnInit() {
    this.playlists = await this.engine.getAllPlaylist();
    console.log(this.playlists);
  }

  public openDialog(song: Song) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      song: song,
    };
    this.dialog.open(AddPlaylistComponent, dialogConfig);
  }

  public async addToSelectedPlaylist(id: number) {
    let success = await this.engine.postAddSong(id, this.data.song.id);
    if (success) this.dialog.closeAll();
  }
}
