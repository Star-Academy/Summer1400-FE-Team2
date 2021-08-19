import Song from "./SongModal";
export default class Playlist {
    public id: number;
    public name: string;
    public songs:Song[];
    public cover:string;
    public artist:string;
    public constructor(playlist: any) {
        this.id = playlist.id;
        this.name = playlist.name;
        this.songs = playlist.songs;
        this.cover = playlist.cover;
        this.artist = playlist.artist;
    }
}
