import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "../components/toast/toast.service";
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
  constructor(private router: Router, private toast: ToastService) {}
  private static get token(): string {
    return localStorage.getItem(TOKEN_KEY) || "";
  }
  private static async sendRequest(url: string, body?: object): Promise<any> {
    const init: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      cache:"reload"
    };

    if (body) {
      init.method = "POST";
      init.body = JSON.stringify(body);      
    }
    const res = await fetch(API.baseUrl + url, init);
    const text_data = await res.text();
    if (res.ok && text_data == "") {
      return "successfully";
    } else {
      if (res.ok) return JSON.parse(text_data);
      throw res;
    }
  }

  public async getAllSongs(): Promise<Song[]> {
    const { songs } = await EngineService.sendRequest(API.routes.getAllSongs);
    return songs.map((x: any) => new Song(x));
  }

  public async getOneSong(id: number = 1): Promise<Song> {
    const { song } = await EngineService.sendRequest(API.routes.getOneSong + id)
      .then((res) => res)
      .catch((error) => this.toast.openSnackBar(error.message, ""));
    return new Song(song);
  }

  public async postFilterSongs(
    size: number = 200,
    current: number = 1,
    sorter: string = "name"
  ): Promise<Song[]> {
    this.toast.openSnackBar("در حال بارگزاری آهنگ", "کمی صبر کنید");
    const { songs } = await EngineService.sendRequest(
      API.routes.postFilterSongs,
      { size, current, sorter }
    )
      .then((res) => res)
      .catch((error) => this.toast.openSnackBar(error.message, ""));
    return songs.map((x: any) => new Song(x));
  }

  public async postSearch(
    phrase: string = "عشق",
    count: number = 20,
    sorter: string = "name",
    desc: boolean = true
  ): Promise<Song[]> {
    this.toast.openSnackBar("نتایج جست و جو در حال بارگزاری", "کمی صبر کنید");

    const { songs } = await EngineService.sendRequest(API.routes.postSearch, {
      phrase,
      count,
      sorter,
      desc,
    })
      .then((res) => res)
      .catch((error) => this.toast.openSnackBar(error.message, ""));
    return songs.map((x: any) => new Song(x));
  }

  public async getPlaylist(id: number): Promise<Object> {
    const { name, songs } = await EngineService.sendRequest(
      API.routes.getPlaylist + id
    )
      .then((res) => res)
      .catch((error) => this.toast.openSnackBar(error.message, ""));
    let playlistSongs = songs.map((x: any) => new Song(x));
    return { name, playlistSongs };
  }

  public async getUser(id: number | string): Promise<Object> {
    const { user } = await EngineService.sendRequest(API.routes.getUser + id)
      .then((res) => res)
      .catch((error) => this.toast.openSnackBar(error.message, ""));
    return user;
  }

  public async isUserLogedin(token: string): Promise<Object> {
    const { id } = await EngineService.sendRequest(API.routes.postToken, {
      token,
    })
      .then((res) => res)
      .catch((error) => this.toast.openSnackBar(error.message, ""));

    return id;
  }

  public async registerUser(user_info: User): Promise<Object> {
    const data = await EngineService.sendRequest(
      API.routes.postRegister,
      user_info
    )
      .then((res) => res)
      .catch((error) => this.toast.openSnackBar(error.message, ""));

    return data;
  }

  public async loginUser(user_info: User): Promise<object> {
    const data = await EngineService.sendRequest(
      API.routes.postLogin,
      user_info
    )
      .then((res) => res)
      .catch((error) => this.toast.openSnackBar(error.message, ""));
    return data;
  }

  public async alterUserInfo(user_info: User): Promise<object> {
     const  answer = await EngineService.sendRequest(
      API.routes.postAlter,
      user_info
    )
      .then((res) =>res)
      .catch((error) => this.toast.openSnackBar(error.message, ""));      
    return answer;
  }
  public setToken(token: string) {
    localStorage.setItem("token", token);
  }
  public getToken(): string {
    return localStorage.getItem("token") || "";
  }
  public setUserId(id: number) {
    localStorage.setItem("userId", "" + id);
  }
  public getUserId() {
    return localStorage.getItem("userId") || "";
  }

  public setUsername(username: string) {
    localStorage.setItem("username", username);
  }
  public getUsername(): string {
    return localStorage.getItem("username") || "";
  }

  public welcomeUser(user_data: object, username: string) {
    this.setToken(user_data["token" as keyof object]);
    this.setUserId(user_data["id" as keyof object]);
    this.setUsername(username);
    // alert(`welcome ${username}`);
    this.router.navigateByUrl("home");
  }
}
