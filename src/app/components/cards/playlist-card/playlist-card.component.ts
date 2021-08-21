import { Component, Input, OnInit } from "@angular/core";
import Playlist from "src/app/models/Playlist";
import { DataHandlerService } from "src/app/service/dataHandler/data-handler.service";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-playlist-card",
  templateUrl: "./playlist-card.component.html",
  styleUrls: ["./playlist-card.component.scss"],
})
export class PlaylistCardComponent implements OnInit {
  constructor(
    private _engine: EngineService,
    private _dataHandle: DataHandlerService
  ) {}
  ngOnInit(): void {}

  @Input() public playlist!: Playlist;
  default_img = "../../../assets/Icons/musical-note.svg";
  default_artist = this._engine.getUsername();
  status: boolean = false;
  public onEditBtn() {
    this.status = !this.status;
  }

  public onDeleteBtn() {
    this._dataHandle.removePlaylist(this.playlist.name, this.playlist.id);
    this.status = !this.status;
  }
}
