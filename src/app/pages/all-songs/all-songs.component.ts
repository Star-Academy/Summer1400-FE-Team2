import { Component, OnInit } from "@angular/core";
import Song from "src/app/models/SongModal";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-all-songs",
  templateUrl: "./all-songs.component.html",
  styleUrls: ["./all-songs.component.scss"],
})
export class AllSongsComponent implements OnInit {
  public songs: Song[] = [];
  public searchText = "";
  public selectedFilter = "name";
  public selectedNumber = 1200;
  public sortFilter = [
    { id: "name", name: "نام آهنگ" },
    { id: "artist", name: "نام خواننده" },
    { id: "name", name: "تاریخ انتشار" },
  ];

  public songsNumber = [
    { id: 10, name: "10" },
    { id: 20, name: "20" },
    { id: 30, name: "30" },
    { id: 60, name: "60" },
    { id: 1200, name: "همه" },
  ];
  public constructor(private engineService: EngineService) {}

  public async ngOnInit() {
    this.songs = await this.engineService.postFilterSongs();
  }

  async change() {
    if (this.searchText === " ")
      this.songs = await this.engineService.postFilterSongs(
        this.selectedNumber,
        1,
        this.selectedFilter
      );
    else this.search();
  }

  async search() {
    this.songs = await this.engineService.postSearch(
      this.searchText,
      this.selectedNumber,
      this.selectedFilter,
      true
    );
  }
}
