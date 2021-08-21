import { Injectable } from "@angular/core";
import Song from "src/app/models/SongModal";
import { EngineService } from "src/app/service/engine.service";
import { ToastService } from "../toast/toast.service";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  constructor(private _engine: EngineService, private _toast: ToastService) {}

  public id: number = 1;
  public index: number = 0;
  public autoPlay: Boolean = false;
  public songs: Song[] = [];
  public audio = new Audio();
  public isLoop: Boolean = false;
  public isShuffle: Boolean = false;

  public setId = (number: number): void => {
    this.id = number;
    let firstSong = this.songs.filter((song) => song.id === number)[0];
    this.index = this.songs.indexOf(firstSong);
    this.loadSong(firstSong);
  };

  public getId = (): number => {
    return this.id;
  };

  public getSong = (): Song => {
    return this.songs[this.index];
  };

  public getProgress(): number {
    return (this.audio.currentTime / this.audio.duration) * 100;
  }

  public getTimeDuration(): string {
    if (!this.audio.duration) return "00:00";
    var minutes = "0" + Math.floor(this.audio.duration / 60);
    var seconds = "0" + Math.floor(this.audio.duration % 60);
    var dur = minutes.substr(-2) + ":" + seconds.substr(-2);
    return dur;
  }

  public getCurrentTime(): string {
    var minutes = "0" + Math.floor(this.audio.currentTime / 60);
    var seconds = "0" + Math.floor(this.audio.currentTime % 60);
    var dur = minutes.substr(-2) + ":" + seconds.substr(-2);
    return dur;
  }

  async getPlaylistName(playlist: number): Promise<string> {
    let data = await this._engine.getPlaylist(playlist);
    this.songs = data.songs;
    return data.name;
  }

  async getAllSongs(): Promise<void> {
    this.songs = await this._engine.getAllSongs();
  }

  public loadSong(song: Song): void {
    this.id = song.id;
    this.audio.src = song.file;
    this.audio.load();
    this._toast.openSnackBar("کمی صبر کنید", "Spotify");
    if (this.autoPlay) this.playSong();
  }
  private randomIndex(): number {
    let random = 1200;
    while (random >= this.songs.length) {
      random = Math.ceil(Math.random() * this.songs.length);
    }
    return random;
  }

  public getNextSong(): Song {
    if (this.isShuffle) {
      this.index = this.randomIndex();
    } else {
      if (this.index > this.songs.length - 2) this.index = 0;
      else this.index++;
    }
    let song = this.songs[this.index];
    this.loadSong(song);
    return song;
  }

  public getPrevSong(): Song {
    if (this.isShuffle) {
      this.index = this.randomIndex();
    } else {
      if (this.index <= 0) this.index = this.songs.length - 1;
      else this.index--;
    }
    let song = this.songs[this.index];
    this.loadSong(song);
    return song;
  }

  public playSong() {
    this.autoPlay = true;
    this.audio.play();
  }

  public pauseSong() {
    this.autoPlay = false;
    this.audio.pause();
  }

  public async addToFavs() {
    let fav = localStorage.getItem("favorites");
    if (fav) this._engine.postAddSong(parseInt(fav), this.id);
  }

  public replaySong() {
    if (this.isLoop) {
      this.audio.loop = false;
      this.isLoop = false;
    } else {
      this.audio.loop = true;
      this.isLoop = true;
    }
  }

  public shuffleSong() {
    this.isShuffle = !this.isShuffle;
  }
}
