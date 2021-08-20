import { Component, Input, OnInit } from "@angular/core";
import Playlist from "src/app/models/Playlist";

@Component({
  selector: "app-playlist-card",
  templateUrl: "./playlist-card.component.html",
  styleUrls: ["./playlist-card.component.scss"],
})
export class PlaylistCardComponent implements OnInit {
  @Input() public playlist!: Playlist;
  default_img = "../../../assets/Icons/musical-note.svg";

  constructor() {}

  ngOnInit(): void {}
}
