import { Component, OnInit } from "@angular/core";
import { CreatePlaylistComponent } from "../modals/create-playlist/create-playlist.component";
@Component({
  selector: "app-mobile-navigation",
  templateUrl: "./mobile-navigation.component.html",
  styleUrls: ["./mobile-navigation.component.scss"],
  providers: [CreatePlaylistComponent],
})
export class MobileNavigationComponent implements OnInit {
  constructor(public _createPlaylist: CreatePlaylistComponent) {}
  public favorites = localStorage.getItem("favorites");
  ngOnInit(): void {}
}
