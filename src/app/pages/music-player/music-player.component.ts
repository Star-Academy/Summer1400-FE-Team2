import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AddPlaylistComponent } from "src/app/components/modals/add-playlist/add-playlist.component";
import { PlayerService } from "src/app/components/player/player.service";
import Song from "src/app/models/SongModal";

@Component({
  selector: "app-music-player",
  templateUrl: "./music-player.component.html",
  styleUrls: ["./music-player.component.scss"],
  providers: [AddPlaylistComponent],
})
export class MusicPlayerComponent implements OnInit {
  constructor(
    private _Activatedroute: ActivatedRoute,
    public player: PlayerService,
    private location: Location,
    private addPlaylist: AddPlaylistComponent
  ) {}

  public id: number | null = 1;
  public song: Song | null = null;
  public duration: string = "00:00";
  public currentTime: string = "00:00";

  public linkPhotoPlay: string = "../assets/Icons/play-button.svg";
  public linkPhotoShuffle: string =
    "../assets/Icons/shuffle-disabled-button.svg";
  public linkPhotoReplay: string = "../assets/Icons/loop-button.svg";

  public async ngOnInit() {
    await this.player.getAllSongs();
    this._Activatedroute.paramMap.subscribe((params) => {
      let number = params.get("id");
      if (number) {
        this.id = parseInt(number);
        let num = parseInt(number);
        if (!this.player.autoPlay || num !== this.player.id) {
          this.player.setId(num);
        }
        this.song = this.player.getSong();
        if (this.player.autoPlay)
          this.linkPhotoPlay = "../assets/Icons/pause-button.svg";
        if (this.player.isShuffle)
          this.linkPhotoShuffle = "../assets/Icons/shuffle-button.svg";
        if (this.player.isLoop)
          this.linkPhotoReplay = "../assets/Icons/right-arrow-button.svg";
        this.getDuration();
        let progress = document.getElementById("progress");
        setInterval(() => {
          this.currentTime = this.player.getCurrentTime();
          if (progress) {
            progress.style.width = this.player.getProgress() + "%";
          }
        }, 500);
      }
    });
  }
  public openModalAddPlalist() {
    if(this.song)this.addPlaylist.openDialog(this.song);
  }
  public fgoBack() {
    window.history.back();
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

  private getDuration() {
    this.location.replaceState("/all-songs/" + this.id);
    let timer = setInterval(() => {
      let time = this.player.getTimeDuration();
      if (time !== "00:00") {
        this.duration = time;
        clearInterval(timer);
      }
    }, 100);
  }
  public nextSong() {
    this.player.getNextSong();
    this.song = this.player.getSong();
    this.id = this.player.getId();
    this.getDuration();
  }

  public prevSong() {
    this.player.getPrevSong();
    this.song = this.player.getSong();
    this.id = this.player.getId();
    this.getDuration();
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
