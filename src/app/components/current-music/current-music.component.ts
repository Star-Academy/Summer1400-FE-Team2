import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import Song from "src/app/models/SongModal";
import { PlayerService } from "../player/player.service";

@Component({
  selector: "app-current-music",
  templateUrl: "./current-music.component.html",
  styleUrls: ["./current-music.component.scss"],
})
export class CurrentMusicComponent implements OnInit {
  constructor(
    private _Activatedroute: ActivatedRoute,
    public player: PlayerService,
    private location: Location
  ) {}

  public id: number | null = 1;
  public song: Song | null = null;

  public linkPhotoPlay: string = "../assets/Icons/play-button.svg";
  public linkPhotoShuffle: string =
    "../assets/Icons/shuffle-disabled-button.svg";
  public linkPhotoReplay: string = "../assets/Icons/loop-button.svg";

  public async ngOnInit() {
    await this.player.getAllSongs();
    let number = this.player.getId();
    if (number) {
      this.song = this.player.getSong();
    }
    if (this.player.autoPlay)
      this.linkPhotoPlay = "../assets/Icons/pause-button.svg";
    if (this.player.isShuffle)
      this.linkPhotoShuffle = "../assets/Icons/shuffle-button.svg";
    if (this.player.isLoop)
      this.linkPhotoReplay = "../assets/Icons/right-arrow-button.svg";
    let progress = document.getElementById("progress");
    console.log(progress);
    setInterval(() => {
      if (progress) {
        progress.style.width = this.player.getProgress() + "%";
      }
    }, 500);
  }

  public playSong() {
    if (!this.player.autoPlay) {
      this.player.playSong();
      this.linkPhotoPlay = "../assets/Icons/pause-button.svg";
    } else {
      this.player.pauseSong();
      this.linkPhotoPlay = "../assets/Icons/play-button.svg";
    }
  }

  public nextSong() {
    this.player.getNextSong();
    this.song = this.player.getSong();
    this.id = this.player.getId();
  }

  public prevSong() {
    this.player.getPrevSong();
    this.song = this.player.getSong();
    this.id = this.player.getId();
  }
  public replaySong() {
    if (!this.player.isLoop) {
      this.linkPhotoReplay = "../assets/Icons/right-arrow-button.svg";
    } else {
      this.linkPhotoReplay = "../assets/Icons/loop-button.svg";
    }
    this.player.replaySong();
  }

  public shuffleSongs() {
    if (!this.player.isShuffle) {
      this.linkPhotoShuffle = "../assets/Icons/shuffle-button.svg";
    } else {
      this.linkPhotoShuffle = "../assets/Icons/shuffle-disabled-button.svg";
    }
    this.player.shuffleSong();
  }
}
