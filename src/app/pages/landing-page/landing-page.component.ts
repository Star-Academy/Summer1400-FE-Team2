import { Component, OnInit } from "@angular/core";
import Song from "src/app/models/SongModal";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements OnInit {
  public songs: Song[] = [];
  public random = Math.random() * 40;

  public namePlaylists = [
    {
      key: "all",
      label: "آهنگ های جدید",
    },
    {
      key: "pop",
      label: "آهنگ های پیشنهادی",
    },
    {
      key: "hiphop",
      label: "برتر های امروز",
    },
    {
      key: "rock",
      label: "محبوب ها",
    },
    {
      key: "rock",
      label: "پربازدید های هفته",
    },
  ];
  public constructor(private engineService: EngineService) {}

  public async ngOnInit() {
    this.songs = await this.engineService.getAllSongs();
  }
}
