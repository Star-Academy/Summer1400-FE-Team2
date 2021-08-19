import { Injectable } from "@angular/core";
import Song from "src/app/models/SongModal";
import { EngineService } from "src/app/service/engine.service";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  constructor(private engine: EngineService, private datePipe: DatePipe) {}

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

  public getTimeDuration(): string | null {
    return this.datePipe.transform(this.audio.duration, "mm:ss");
  }

  public getCurrentTime(): string | null {
    return this.datePipe.transform(this.audio.currentTime, "mm:ss");
  }

  async getPlaylistName(playlist: number): Promise<string> {
    let data = await this.engine.getPlaylist(playlist);
    this.songs = data.songs;
    return data.name;
  }

  async getAllSongs(): Promise<void> {
    this.songs = await this.engine.getAllSongs();
  }

  public loadSong(song: Song): void {
    this.id = song.id;
    this.audio.src = song.file;
    this.audio.load();
  }

  public getNextSong(): Song {
    if (this.index > this.songs.length) this.index = 0;
    else this.index++;
    let song = this.songs[this.index];
    this.loadSong(song);
    return song;
  }

  public getPrevSong(): Song {
    if (this.index < 0) this.index = this.songs.length - 1;
    else this.index--;
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
