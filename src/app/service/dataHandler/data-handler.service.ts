import { Injectable } from "@angular/core";
import Playlist from "src/app/models/Playlist";
import User from "src/app/models/User";
import { EngineService } from "../engine.service";

@Injectable({
  providedIn: "root",
})
export class DataHandlerService {
  constructor(private _engine: EngineService) {
    if(this._engine.getToken()){
      this.getPlaylists();
      this.getUser();
      this.getfavs();
    }
  }
  public playlists: Playlist[] = [];
  private favoriteSongs: Playlist = new Playlist({ songs: [] });
  public user: User = new User({ firstName: "loading" });

  public async getUser() {
    this.user = await this._engine.getUser();
  }
  public getUsername(): string {
    return this.user.username;
  }
  public async getfavs() {
    let id = this._engine.getFavoriteId();
    if (id) {
      this.favoriteSongs = await this._engine.getPlaylist(+id);
    }
  }
  public ifSongExists(id: number): Boolean {
    let res = this.favoriteSongs.songs.filter((x) => x.id === id);
    return res.length === 1;
  }
  public setUsername(username: string) {
    this._engine.setUsername(username);
  }
  public async alterUser(user: User) {
    await this._engine.alterUserInfo(user);
    await this.getPlaylists();
    this.getUser();
  }

  private async getPlaylists() {
    this.playlists = await this._engine.getAllPlaylist();
  }
  public async addPlaylist(name: string): Promise<any> {
    const res = await this._engine.postCreatePlaylist(name);
    await this.getPlaylists();
    return res;
  }
  public async removePlaylist(name: string, playlistId: number): Promise<any> {
    const res = await this._engine.removePlaylist(playlistId, name);
    await this.getPlaylists();
    return res;
  }
}
