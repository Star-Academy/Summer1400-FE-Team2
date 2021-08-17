import { Injectable } from "@angular/core";
import Song from "../models/SongModal";
import User from "../models/User";
const TOKEN_KEY = "NCPL";

const API = {
  baseUrl: "https://songs.code-star.ir/",
  routes: {
    getUser: "user/one/",
    postToken: "user/auth",
    postRegister: "user/register",
    postLogin: "user/login",
    postAlter: "user/alter",
    getAllSongs: "song/all",
    getOneSong: "song/one/",
    postFilterSongs: "song/page",
    postSearch: "song/find",
    getPlaylist: "playlist/one/",
    postAllPlaylists: "playlist/all",
    postCreatePlaylist: "playlist/create",
    postRemovePlaylist: "playlist/remove",
    postAddSong: "playlist/add-song",
    postRemoveSong: "playlist/remove-song",
  },
};

@Injectable({
  providedIn: "root",
})
export class EngineService {
  private static get token(): string {
    return localStorage.getItem(TOKEN_KEY) || "";
  }
  private static async sendRequest(url: string, body?: object): Promise<any> {
    const init: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      init.method = "POST";
      init.body = JSON.stringify(body);
    }

    return fetch(API.baseUrl + url, init).then((res) => {
      if (res.ok) return res.json();
      throw res.json();
    });
  }

  public async getAllSongs(): Promise<Song[]> {
    const { songs } = await EngineService.sendRequest(API.routes.getAllSongs);
    return songs.map((x: any) => new Song(x));
  }

  public async getOneSong(id: number = 1): Promise<Song> {
    const { song } = await EngineService.sendRequest(
      API.routes.getOneSong + id
    );
    return new Song(song);
  }

  public async postFilterSongs(
    size: number = 20,
    current: number = 1
  ): Promise<Song[]> {
    const { songs } = await EngineService.sendRequest(
      API.routes.postFilterSongs,
      { size, current }
    );
    return songs.map((x: any) => new Song(x));
  }

  public async postSearch(
    phrase: string = "عشق",
    count: number = 20,
    sorter: string = "name",
    desc: boolean = true
  ): Promise<Song[]> {
    const { songs } = await EngineService.sendRequest(API.routes.postSearch, {
      phrase,
      count,
      sorter,
      desc,
    });
    return songs.map((x: any) => new Song(x));
  }

  public async getPlaylist(id: number): Promise<Object> {
    const { name, songs } = await EngineService.sendRequest(
      API.routes.getPlaylist + id
    );
    let playlistSongs = songs.map((x: any) => new Song(x));
    return { name, playlistSongs };
  }

  public async getUser(id: number): Promise<Object> {
    const {user } = await EngineService.sendRequest(
      API.routes.getUser + id
    );
    
    return user;
  }
  public async isUserLogedin(token:string): Promise<Object> {
    const {id} = await EngineService.sendRequest(
      API.routes.postToken,{token}
    );
    
    return id;
  }

  public async registerUser(user_info:User): Promise<Object> {
    const {identity } = await EngineService.sendRequest(
      API.routes.postRegister,user_info
    );
    
    return identity;
  }
  
  public async loginUser(user_info:User): Promise<Object> {
    const {data} = await EngineService.sendRequest(
      API.routes.postLogin,user_info
    );
    return data;
  }

  public async alterUserInfo(user_info:User): Promise<Object> {
    const {user } = await EngineService.sendRequest(
      API.routes.postAlter ,user_info
    );
    
    return user;
  }

  // public async isUserAuthorized(token: string): Promise<Object> {
  //   const {id } = await EngineService.sendRequest(
  //     API.routes.postToken,{token}
  //   );
    
  //   return id;
  // }
}
