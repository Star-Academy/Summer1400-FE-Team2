import { EventEmitter, Injectable } from "@angular/core";
import Song from "src/app/models/SongModal";
import { DataHandlerService } from "src/app/service/dataHandler/data-handler.service";
import { EngineService } from "src/app/service/engine.service";
import { ToastService } from "../toast/toast.service";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  constructor(
    private _engine: EngineService,
    private _toast: ToastService,
    public _dataHandler: DataHandlerService
  ) {}

  public id: number = 1;
  public index: number = 0;
  public autoPlay: Boolean = false;
  public songsList: Song[] = [];
  public currentSong: Song = new Song({});
  public audio = new Audio();
  public isLoop: Boolean = false;
  public isShuffle: Boolean = false;
  public name: String = "همه آهنگ ها";
  public liked: Boolean = false;
  public isFirstPlay = true;
  public isCurrentMusicEnabled = new EventEmitter<Boolean>();
  public isPlaylistEnabled = new EventEmitter<Boolean>();

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

  public getProgress(): string {
    let time = (this.audio.currentTime / this.audio.duration) * 100 + "%";
    return time;
  }

  private convertTime(time: number): string {
    var minutes = "0" + Math.floor(time / 60);
    var seconds = "0" + Math.floor(time % 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
  }

  public getTimeDuration(): string {
    if (!this.audio.duration) return "00:00";
    return this.convertTime(this.audio.duration);
  }

  public getCurrentTime(): string {
    return this.convertTime(this.audio.currentTime);
  }

  async getPlaylistName(playlist: number): Promise<void> {
    let { songs, name } = await this._engine.getPlaylist(playlist);
    this.liked = this._dataHandler.ifSongExists(songs[0]?.id);
    this.songsList = songs;
    this.name = name;
    await this.setId(this.songsList[0]?.id);
  }

  async setSongsList(playlist: number): Promise<void> {    
    let { songs, name } = await this._engine.getPlaylist(playlist);    
    this.liked = this._dataHandler.ifSongExists(songs[0]?.id);
    this.songsList = songs;
    this.name = name;
  }  

  async getAllSongs(): Promise<void> {
    this.songsList = await this._engine.getAllSongs();
    this.name = "همه آهنگ ها";
  }

  public loadSong(song: Song): void {
    this.id = song.id;
    this.currentSong = song;
    this.audio.src = song.file;
    this.liked = this._dataHandler.ifSongExists(song.id);
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
    console.log('[getNextSong] songsList = ',this.songsList,'index='+this.index);
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
    console.log("in play song service");
    this.autoPlay = true;
    this.audio.play();
    this.audio.addEventListener("ended", () => this.getNextSong());
  }

  public pauseSong() {
    console.log("in pause song service");
    this.autoPlay = false;
    this.audio.pause();
  }

  public async addToFavs() {
    let fav = this._engine.getFavoriteId();
    if (fav)
      !this.liked
        ? await this._engine.postAddSong(parseInt(fav), this.id)
        : await this._engine.removeSong(parseInt(fav), this.id);
    await this._dataHandler.getfavs();
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
