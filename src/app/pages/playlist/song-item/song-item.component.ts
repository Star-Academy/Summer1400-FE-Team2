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
    let temp = new Audio();
    temp.src = this.Song.file;
    temp.load();
    let timer = setInterval(() => {
      let time = `${temp.duration}`;
      if (time !== "NaN") {
        var minutes = "0" + Math.floor(+time / 60);
        var seconds = "0" + Math.floor(+time % 60);
        this.publish_date = minutes.substr(-2) + ":" + seconds.substr(-2);
        clearInterval(timer);
      }
    }, 200);
    this._Activatedroute.paramMap.subscribe((params) => {
      this.playlistId = params.get("id") || "";
    });
  }

  public async onDeleteSong() {
    await this._engine.removeSong(this.playlistId, this.Song.id);
    this.deleteEventEmitter.emit(true);
  }
}
