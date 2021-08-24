import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AddPlaylistComponent } from "src/app/components/modals/add-playlist/add-playlist.component";
import { PlayerService } from "src/app/components/player/player.service";
import { ToastService } from "src/app/components/toast/toast.service";
import { EngineService } from "src/app/service/engine.service";

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
    private _addPlaylist: AddPlaylistComponent,
    public toast:ToastService,
    private _engin:EngineService
  ) {}

  public showLyrics: Boolean = false;
  public linkPhotoPlay: string = "../assets/Icons/play-button.svg";
  public linkPhotoShuffle: string =
    "../assets/Icons/shuffle-disabled-button.svg";
  public linkPhotoReplay: string = "../assets/Icons/loop-button.svg";
  public linkPhotoLike: string = "../assets/Icons/like-button-empty.svg";

  public async ngOnInit() {
    if (this._player.name === "همه آهنگ ها") await this._player.getAllSongs();
    this._Activatedroute.paramMap.subscribe((params) => {
      let number = params.get("id");
      if (number) {
        let num = parseInt(number);
        if (!this._player.autoPlay || num !== this._player.id)
          this._player.setId(num);
        if (this._player.autoPlay)
          this.linkPhotoPlay = "../assets/Icons/pause-button.svg";
        if (this._player.isShuffle)
          this.linkPhotoShuffle = "../assets/Icons/shuffle-button.svg";
        if (this._player.isLoop)
          this.linkPhotoReplay = "../assets/Icons/right-arrow-button.svg";
        if (this._player.liked) this.linkPhotoLike = "../assets/Icons/like.svg";
        this.setUrl();
        let container = document.getElementById("progress-container");
        container?.addEventListener("click", (e) => {
          this._player.seek(e.offsetX, container?.offsetWidth);
        });
        setInterval(() => {}, 200);
      }
    });
  }
  public openModalAddPlalist() {
    if (this._player.currentSong)
      this._addPlaylist.openDialog(this._player.currentSong);
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

  private setUrl() {
    this._location.replaceState("/all-songs/" + this._player.id);
  }
  public nextSong() {
    this._player.getNextSong();
    this.setUrl();
    this.toggleLike();
  }

  public prevSong() {
    this._player.getPrevSong();
    this.setUrl();
    this.toggleLike();
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
  public toggleShowLyrics() {
    this.showLyrics = !this.showLyrics;
    this.toggleLyrics();
  }

  public toggleLyrics() {
    const lyricsBtn = document.getElementById("song-lyrics-button")!;
    const lyrics_container = document.getElementById("music-lyrics_container")!;
    const music_lyrics = document.getElementById("music-lyrics")!;
    const music_cover = document.getElementById("cover")!;
    music_lyrics.innerText = this._player.currentSong.lyrics;
    if (this.showLyrics) {
      music_cover.style.display = "none";
      lyrics_container.style.display = "block";
      music_lyrics.style.display = "block";
      lyricsBtn.style.display = "none";
    } else {
      music_cover.style.display = "block";
      lyrics_container.style.display = "none";
      music_lyrics.style.display = "none";
      lyricsBtn.style.display = "block";
    }
  }
  public isNameWidthLong() {
    return this._player.currentSong?.name?.length! < 20;
  }

  private toggleLike() {
    if (!this._player.liked) {
      this.linkPhotoLike = "../assets/Icons/like-button-empty.svg";
    } else {
      this.linkPhotoLike = "../assets/Icons/like.svg";
    }
  }

  public async addToFavorites() {
    if(this._engin.getToken()){
      this._player.addToFavs();
      this._player.liked = !this._player.liked;
      this.toggleLike();
    }else{
      this.toast.openSnackBar("ابتدا وارد شوید",'Spotify');
    }
  }
}
