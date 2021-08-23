import { Component, OnInit } from "@angular/core";
import Song from "src/app/models/SongModal";
import { AddPlaylistComponent } from "../modals/add-playlist/add-playlist.component";
import { PlayerService } from "../player/player.service";

@Component({
  selector: "app-current-music",
  templateUrl: "./current-music.component.html",
  styleUrls: ["./current-music.component.scss"],
  providers: [AddPlaylistComponent],
})
export class CurrentMusicComponent implements OnInit {
  constructor(
    public _player: PlayerService,
    private _addPlaylist: AddPlaylistComponent
  ) {}
  public linkPhotoPlay: string = "../assets/Icons/play-button.svg";
  public linkPhotoShuffle: string =
    "../assets/Icons/shuffle-disabled-button.svg";
  public linkPhotoReplay: string = "../assets/Icons/loop-button.svg";

  public async ngOnInit() {
    await this._player.getAllSongs();
    if (this._player.autoPlay)
      this.linkPhotoPlay = "../assets/Icons/pause-button.svg";
    if (this._player.isShuffle)
      this.linkPhotoShuffle = "../assets/Icons/shuffle-button.svg";
    if (this._player.isLoop)
      this.linkPhotoReplay = "../assets/Icons/right-arrow-button.svg";
    let progress = document.getElementById("progress");
    setInterval(() => {
      if (progress) {
        progress.style.width = this._player.getProgress() + "%";
      }
    }, 500);
  }

  public openModalAddPlalist() {
    this._addPlaylist.openDialog(this._player.currentSong);
  }

  public async addToFavorites() {
    this._player.addToFavs();
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
  }

  public prevSong() {
    this._player.getPrevSong();
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
  public isNameWidthLong(){        
    return this._player.currentSong.name?.length! < 12;
  }
}
