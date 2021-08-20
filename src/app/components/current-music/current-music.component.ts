import { Component, OnInit } from "@angular/core";
import Song from "src/app/models/SongModal";
import { PlayerService } from "../player/player.service";

@Component({
  selector: "app-current-music",
  templateUrl: "./current-music.component.html",
  styleUrls: ["./current-music.component.scss"],
})
export class CurrentMusicComponent implements OnInit {
  constructor(public player: PlayerService) {}

  public id: number | null = 1;
  public song: Song | null = null;
  public isPlaying: Boolean = false;
  public async ngOnInit() {
    await this.player.getAllSongs();
    let number = this.player.getId();
    if (number) {
      this.song = this.player.getSong();
    }
  }
}
