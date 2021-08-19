import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PlayerService } from "src/app/components/player/player.service";
import Song from "src/app/models/SongModal";

@Component({
  selector: "app-music-player",
  templateUrl: "./music-player.component.html",
  styleUrls: ["./music-player.component.scss"],
})
export class MusicPlayerComponent implements OnInit {
  constructor(
    private _Activatedroute: ActivatedRoute,
    public player: PlayerService
  ) {}

  public id: number | null = 1;
  public song: Song | null = null;

  public async ngOnInit() {
    await this.player.getAllSongs();
    this._Activatedroute.paramMap.subscribe((params) => {
      let number = params.get("id");
      if (number) {
        this.id = parseInt(number);
        let num = parseInt(number);
        console.log(number);
        this.player.setId(num);
        this.song = this.player.getSong();
      }
    });
  }
}
