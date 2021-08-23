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
  public songsList: Song[] = [];
  public currentSong: Song = new Song({});
  public audio = new Audio();
  public isLoop: Boolean = false;
  public isShuffle: Boolean = false;
  public name: String = "همه آهنگ ها";

  public setId = (number: number): void => {
    this.id = number;
    let firstSong = this.songsList.filter((song) => song.id === number)[0];
    this.index = this.songsList.indexOf(firstSong);
    this.loadSong(firstSong);
  };

  public getId = (): number => {
    return this.id;
  };

  public getSong = (): Song => {
    return this.songsList[this.index];
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

  async getPlaylistName(playlist: number): Promise<void> {
    let { songs, name } = await this._engine.getPlaylist(playlist);
    this.songsList = songs;
    this.name = name;
    await this.setId(this.songsList[0].id);
  }

  async getAllSongs(): Promise<void> {
    this.songsList = await this._engine.getAllSongs();
    this.name = "همه آهنگ ها";
  }

  public loadSong(song: Song): void {
    this.id = song.id;
    this.currentSong = song;
    this.audio.src = song.file;
    this.audio.load();
    this._toast.openSnackBar("کمی صبر کنید", "Spotify");
    if (this.autoPlay) this.playSong();
  }
  private randomIndex(): number {
    let random = 1200;
    while (random >= this.songsList.length) {
      random = Math.ceil(Math.random() * this.songsList.length);
    }
    return random;
  }

  public getNextSong(): Song {
    if (this.isShuffle) {
      this.index = this.randomIndex();
    } else {
      if (this.index > this.songsList.length - 2) this.index = 0;
      else this.index++;
    }
    let song = this.songsList[this.index];
    this.loadSong(song);
    return song;
  }

  public getPrevSong(): Song {
    if (this.isShuffle) {
      this.index = this.randomIndex();
    } else {
      if (this.index <= 0) this.index = this.songsList.length - 1;
      else this.index--;
    }
    let song = this.songsList[this.index];
    this.loadSong(song);
    return song;
  }

  public seek(time: number, long: number = 100) {
    this.audio.currentTime = (time / long) * this.audio.duration;
  }

  public playSong() {
    this.autoPlay = true;
    this.audio.play();
    this.audio.addEventListener("ended", () => this.getNextSong());
  }

  public pauseSong() {
    this.autoPlay = false;
    this.audio.pause();
  }

  public async addToFavs() {
    let fav = this._engine.getFavoriteId();
    if (fav) await this._engine.postAddSong(parseInt(fav), this.id);
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
