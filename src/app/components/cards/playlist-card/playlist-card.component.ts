import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import Playlist from "src/app/models/Playlist";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-playlist-card",
  templateUrl: "./playlist-card.component.html",
  styleUrls: ["./playlist-card.component.scss"],
})
export class PlaylistCardComponent implements OnInit {
  constructor(private _engine: EngineService) {}
  ngOnInit(): void {}

  @Input() public playlist!: Playlist;
  default_img = "../../../assets/Icons/musical-note.svg";
  default_artist = this._engine.getUsername();
  status: boolean = false;
  onEditBtn() {
    this.status = !this.status;
  }

  onDeleteBtn() {
    const token = this._engine.getToken();
    const id = this.playlist.id;
    this._engine.removePlaylist(token, id, this.playlist.name);
    this.status = !this.status;
  }
}
