import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import Playlist from "src/app/models/Playlist";
import Song from "src/app/models/SongModal";
import { EngineService } from "src/app/service/engine.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-song-item",
  templateUrl: "./song-item.component.html",
  styleUrls: ["./song-item.component.scss"],
})
export class SongItemComponent implements OnInit {
  constructor(
    private _engine: EngineService,
    private _Activatedroute: ActivatedRoute
  ) {}

  @Input() Song!: Song;
  @Input() Playlist!: Playlist | null;
  @Input() Index!: number | 0;
  @Output() public deleteEventEmitter: EventEmitter<Boolean> =
    new EventEmitter<Boolean>();

  publish_date: string = "";
  playlistId: string = "";
  ngOnInit(): void {
    this.publish_date = `
  ${new Date(this.Song.publish_date).getFullYear()}/${new Date(
      this.Song.publish_date
    ).getMonth()}/${new Date(this.Song.publish_date).getDay()}
  `;
    this._Activatedroute.paramMap.subscribe((params) => {
      this.playlistId = params.get("id") || "";
    });
  }

  public async onDeleteSong() {
    await this._engine.removeSong(this.playlistId, this.Song.id);
    this.deleteEventEmitter.emit(true);
  }
}
