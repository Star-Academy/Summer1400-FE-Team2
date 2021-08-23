export default class Song {
  public id: number;
  public name: string;
  public artist: string;
  public lyrics: string;
  public cover: string;
  public file: string;
  public publish_date: string;
  public constructor(song: any) {
    this.id = song.id;
    this.name = song.name;
    this.artist = song.artist;
    this.lyrics = song.lyrics;
    this.cover = song.cover;
    this.file = song.file;
    this.publish_date = song.publish_date;
  }
}
