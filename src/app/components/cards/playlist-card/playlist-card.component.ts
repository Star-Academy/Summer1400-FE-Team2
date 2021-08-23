import { Component, Input, OnInit } from "@angular/core";
import Playlist from "src/app/models/Playlist";
import { DataHandlerService } from "src/app/service/dataHandler/data-handler.service";

@Component({
  selector: "app-playlist-card",
  templateUrl: "./playlist-card.component.html",
  styleUrls: ["./playlist-card.component.scss"],
})
export class PlaylistCardComponent implements OnInit {
  constructor(private _dataHandle: DataHandlerService) {}
  ngOnInit(): void {}

  @Input() public playlist!: Playlist;
  public default_img = "../../../assets/Icons/musical-note.svg";
  public default_artist = this._dataHandle.getUsername();
  public status: boolean = false;

  public onEditBtn() {
    this.status = !this.status;
  }

  public onDeleteBtn() {
    this._dataHandle.removePlaylist(this.playlist.name, this.playlist.id);
    this.status = !this.status;
  }
}
