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
    public _player: PlayerService,
    private _location: Location,
    private _addPlaylist: AddPlaylistComponent
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
    await this._player.getAllSongs();
    this._Activatedroute.paramMap.subscribe((params) => {
      let number = params.get("id");
      if (number) {
        this.id = parseInt(number);
        let num = parseInt(number);
        if (!this._player.autoPlay || num !== this._player.id) {
          this._player.setId(num);
        }
        this.song = this._player.getSong();
        if (this._player.autoPlay)
          this.linkPhotoPlay = "../assets/Icons/pause-button.svg";
        if (this._player.isShuffle)
          this.linkPhotoShuffle = "../assets/Icons/shuffle-button.svg";
        if (this._player.isLoop)
          this.linkPhotoReplay = "../assets/Icons/right-arrow-button.svg";
        this.getDuration();
        let progress = document.getElementById("progress");
        setInterval(() => {
          this.currentTime = this._player.getCurrentTime();
          if (progress) {
            progress.style.width = this._player.getProgress() + "%";
          }
        }, 500);
      }
    });
  }
  public openModalAddPlalist() {
    if (this.song) this._addPlaylist.openDialog(this.song);
  }
  public async addToFavorites() {
    this._player.addToFavs();
  }

  public fgoBack() {
    window.history.back();
  }
  public playSong() {
    if (!this._player.autoPlay) {
      this._player.playSong();
      this.linkPhotoPlay = "../assets/Icons/pause-button.svg";
    } else {
      this._player.pauseSong();
      this.linkPhotoPlay = "../assets/Icons/play-button.svg";
    }
  }

  private getDuration() {
    this._location.replaceState("/all-songs/" + this.id);
    let timer = setInterval(() => {
      let time = this._player.getTimeDuration();
      if (time !== "00:00") {
        this.duration = time;
        clearInterval(timer);
      }
    }, 100);
  }
  public nextSong() {
    this._player.getNextSong();
    this.song = this._player.getSong();
    this.id = this._player.getId();
    this.getDuration();
  }

  public prevSong() {
    this._player.getPrevSong();
    this.song = this._player.getSong();
    this.id = this._player.getId();
    this.getDuration();
  }

  public replaySong() {
    if (!this._player.isLoop) {
      this.linkPhotoReplay = "../assets/Icons/right-arrow-button.svg";
    } else {
      this.linkPhotoReplay = "../assets/Icons/loop-button.svg";
    }
    this._player.replaySong();
  }

  public shuffleSongs() {
    if (!this._player.isShuffle) {
      this.linkPhotoShuffle = "../assets/Icons/shuffle-button.svg";
    } else {
      this.linkPhotoShuffle = "../assets/Icons/shuffle-disabled-button.svg";
    }
    this._player.shuffleSong();
  }
}
