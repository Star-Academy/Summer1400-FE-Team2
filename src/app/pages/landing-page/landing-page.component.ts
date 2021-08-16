import { Component, HostListener, OnInit } from "@angular/core";
import Song from "src/app/models/SongModal";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements OnInit {
  public songs: Song[] = [];
  public constructor(private engineService: EngineService) {}

  public async ngOnInit() {
    this.songs = await this.engineService.getAllSongs();
  }
}
