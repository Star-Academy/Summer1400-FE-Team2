import { Component, OnInit } from "@angular/core";
import { CreatePlaylistComponent } from "../modals/create-playlist/create-playlist.component";
@Component({
  selector: "app-desktop-navigation",
  templateUrl: "./desktop-navigation.component.html",
  styleUrls: ["./desktop-navigation.component.scss"],
  providers: [CreatePlaylistComponent],
})
export class DesktopNavigationComponent implements OnInit {
  constructor(private _createPlaylist: CreatePlaylistComponent) {}
  public favorites = localStorage.getItem("favorites");
  ngOnInit(): void {}
  public openModalCreatePlalist() {
    this._createPlaylist.openDialog();
  }
}
