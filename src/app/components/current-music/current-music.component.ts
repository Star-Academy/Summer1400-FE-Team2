import { Component, OnInit } from "@angular/core";
import { AddPlaylistComponent } from "../modals/add-playlist/add-playlist.component";
import { PlayerService } from "../player/player.service";
import { ToastService } from "../toast/toast.service";
import { EngineService } from "src/app/service/engine.service";
@Component({
  selector: "app-current-music",
  templateUrl: "./current-music.component.html",
  styleUrls: ["./current-music.component.scss"],
  providers: [AddPlaylistComponent],
})
export class CurrentMusicComponent implements OnInit {
  constructor(
    public _player: PlayerService,
    private _addPlaylist: AddPlaylistComponent,
    public toast:ToastService,
    private _engin:EngineService
  ) {}

  public linkPhotoPlay: string = "../assets/Icons/play-button.svg";
  public linkPhotoShuffle: string =
    "../assets/Icons/shuffle-disabled-button.svg";
  public linkPhotoReplay: string = "../assets/Icons/loop-button.svg";
  public linkPhotoLike: string = "../assets/Icons/like-button-empty.svg";

  public async ngOnInit() {
    await this._player.getAllSongs();
    if (this._player.autoPlay)
      this.linkPhotoPlay = "../assets/Icons/pause-button.svg";
    if (this._player.isShuffle)
      this.linkPhotoShuffle = "../assets/Icons/shuffle-button.svg";
    if (this._player.isLoop)
      this.linkPhotoReplay = "../assets/Icons/right-arrow-button.svg";
    if (this._player.liked) this.linkPhotoLike = "../assets/Icons/like.svg";
    let container = document.getElementById("progress-container");
    container?.addEventListener("click", (e) => {
      this._player.seek(e.offsetX, container?.offsetWidth);
    });

    setInterval(() => {}, 200);
  }

  public openModalAddPlalist() {
    this._addPlaylist.openDialog(this._player.currentSong);
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

  public playSong() {
    if (!this._player.autoPlay) {
      this._player.playSong();
      this.linkPhotoPlay = "../assets/Icons/pause-button.svg";
    } else {
      this._player.pauseSong();
      this.linkPhotoPlay = "../assets/Icons/play-button.svg";
    }
  }

  public nextSong() {
    this._player.getNextSong();
    this.toggleLike();
  }

  public prevSong() {
    this._player.getPrevSong();
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

  public isNameWidthLong() {
    return this._player.currentSong?.name?.length! < 20;
  }
}
