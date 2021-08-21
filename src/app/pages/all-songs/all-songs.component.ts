import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
  public noReasult = "";
  public selectedFilter = "name";
  public selectedNumber = 10;
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
  public constructor(
    private _engine: EngineService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
  ) {}

  public async ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params) => {
      let data = params["search"];
      if (data !== "") {
        this.searchText = data;
        this.search();
        this._location.replaceState("/all-songs");
      } else this.change();
    });
  }

  async change() {
    if (!this.searchText)
      this.songs = await this._engine.postFilterSongs(
        this.selectedNumber,
        1,
        this.selectedFilter
      );
    else this.search();
  }

  async search() {
    if (this.searchText) {
      this.songs = await this._engine.postSearch(
        this.searchText,
        this.selectedNumber,
        this.selectedFilter,
        true
      );
      this.noReasult = "آهنگی یافت نشد";
    } else this.change();
  }
}
