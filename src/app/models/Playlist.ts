import Song from "./SongModal";
export default class Playlist {
  public id: number;
  public name: string;
  public songs: Song[];
  public cover: any;
  public artist: string;
  public constructor(playlist: any) {
    this.id = playlist.id;
    this.name = playlist.name;
    this.songs = playlist.songs;
    if (playlist.songs.length > 0) this.cover = playlist.songs[0].cover;
    this.artist = playlist.artist;
  }
}
