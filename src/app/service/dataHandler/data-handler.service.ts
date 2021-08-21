import { Injectable } from "@angular/core";
import Playlist from "src/app/models/Playlist";
import { EngineService } from "../engine.service";

@Injectable({
  providedIn: "root",
})
export class DataHandlerService {
  constructor(private _engine: EngineService) {
    this.getPlaylists();
  }
  public playlists: Playlist[] = [];
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
