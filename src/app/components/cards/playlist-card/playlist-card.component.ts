import { Component, Input, OnInit } from "@angular/core";
import Playlist from "src/app/models/Playlist";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-playlist-card",
  templateUrl: "./playlist-card.component.html",
  styleUrls: ["./playlist-card.component.scss"],
})
export class PlaylistCardComponent implements OnInit {
  constructor(private engine:EngineService) {}
  ngOnInit(): void {}

  @Input() public playlist!: Playlist;
  default_img = "../../../assets/Icons/musical-note.svg";
  default_artist =this.engine.getUsername();

  onEditBtn(){
    console.log('on edit button');
  }

}
