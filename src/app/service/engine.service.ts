import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "../components/toast/toast.service";
import Playlist from "../models/Playlist";
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

  private static async sendRequest(url: string, body?: object): Promise<any> {
    const init: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
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
      throw JSON.parse(text_data);
    }
  }

  public async getAllSongs(): Promise<Song[]> {
    const { songs } = await EngineService.sendRequest(API.routes.getAllSongs);
    return songs.map((x: any) => new Song(x));
  }

  public async getOneSong(id: number = 1): Promise<Song> {
    const { song } = await EngineService.sendRequest(
      API.routes.getOneSong + id
    ).catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));
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
    ).catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));
    return songs.map((x: any) => new Song(x));
  }

  public async postAddSong(
    playlistId: number,
    songId: number
  ): Promise<Boolean> {
    let token = this.getToken();
    const answer = await EngineService.sendRequest(API.routes.postAddSong, {
      playlistId,
      songId,
      token,
    })
      .then(() => this.toast.openSnackBar("با موفقیت اضافه شد","Spotify"))
      .catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));
    return true;
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
    }).catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));
    return songs.map((x: any) => new Song(x));
  }

  public async getPlaylist(id: number): Promise<Playlist> {
    const data = await EngineService.sendRequest(
      API.routes.getPlaylist + id
    ).catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));
    return new Playlist(data);
  }

  public async getAllPlaylist(token?: string): Promise<Array<Playlist>> {
    this.toast.openSnackBar("کمی صبر کنید", "Spotify");
    const playlists = await EngineService.sendRequest(
      API.routes.postAllPlaylists,
      { token: this.getToken() }
    ).catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));
    let playlists_arr = playlists.map(
      (playlist: any) => new Playlist(playlist)
    );
    return playlists_arr;
  }

  public async removePlaylist(
    token: string,
    id: number,
    name: string | string
  ) {
    if (name === "مورد علاقه") {
      this.toast.openSnackBar("لیست مورد علاقه شما قابل حذف نیست", "ُSpotify");
      return;
    }
    await EngineService.sendRequest(API.routes.postRemovePlaylist, {
      token: token,
      id: id,
    })
      .then((res) => {
        this.toast.openSnackBar("پلی لیست با موفقیت حذف شد", "پیغام سرور");
        return res;
      })
      .catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));
  }

  public async postCreatePlaylist(name: string): Promise<Object> {
    let token = this.getToken();
    const answer = await EngineService.sendRequest(
      API.routes.postCreatePlaylist,
      { name, token }
    ).catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));
    if (name === "مورد علاقه") localStorage.setItem("favorites", answer.id);
    return true;
  }

  public async getUser(id: number | string): Promise<Object> {
    const { user } = await EngineService.sendRequest(
      API.routes.getUser + id
    ).catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));
    return user;
  }

  public async isUserLogedin(token: string): Promise<Object> {
    const { id } = await EngineService.sendRequest(API.routes.postToken, {
      token,
    })
      .then((res) => res)
      .catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));

    return id;
  }

  public async registerUser(user_info: User): Promise<Object> {
    const { token, id } = await EngineService.sendRequest(
      API.routes.postRegister,
      user_info
    ).catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));
    this.setToken(token);
    this.setUserId(id);
    this.setUsername(user_info.username);
    if (token) {
      await this.postCreatePlaylist("مورد علاقه");
    }
    return true;
  }

  public async loginUser(user_info: User): Promise<any> {
    const { token, id } = await EngineService.sendRequest(
      API.routes.postLogin,
      user_info
    ).catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));
    this.setToken(token);
    this.setUserId(id);
    if (token) {
      let playlists = await this.getAllPlaylist(token);
      let id = playlists.filter((x) => x.name === "مورد علاقه")[0].id;
      localStorage.setItem("favorites", `${id}`);
    }
    this.setUsername(user_info.username);
    return true;
  }

  public async alterUserInfo(user_info: User): Promise<void> {
    await EngineService.sendRequest(API.routes.postAlter, user_info)
      .then((res) => {
        this.toast.openSnackBar("اطلاعات با موفقیت ثبت شد", "پیغام سرور");
        return res;
      })
      .catch((error) => this.toast.openSnackBar(error.message, "پیغام سرور"));
  }
  public setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || "";
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

  public welcomeUser() {
    this.toast.openSnackBar(this.getUsername() + " خوش آمدی! ", " Spotify ");
    this.router.navigateByUrl("home");
  }

  public shouldLogin() {
    this.toast.openSnackBar("ابتدا وارد شوید", " Spotify ");
  }
}
