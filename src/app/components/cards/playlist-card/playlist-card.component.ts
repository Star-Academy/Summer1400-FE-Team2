import { Component, Input, EventEmitter, OnInit, Output } from "@angular/core";
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
  @Output() public deleteEventEmitter: EventEmitter<Boolean> =
    new EventEmitter<Boolean>();
  default_img = "../../../assets/Icons/musical-note.svg";
  default_artist = this._engine.getUsername();
  status: boolean = false;
  public onEditBtn() {
    this.status = !this.status;
  }

  public onDeleteBtn() {
    const token = this._engine.getToken();
    const id = this.playlist.id;
    this._engine.removePlaylist(token, id, this.playlist.name);
    this.deleteEventEmitter.emit(true);
    this.status = !this.status;
  }
}
