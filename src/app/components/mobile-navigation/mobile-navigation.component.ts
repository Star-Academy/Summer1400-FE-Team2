import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CreatePlaylistComponent } from "../modals/create-playlist/create-playlist.component";
@Component({
  selector: "app-mobile-navigation",
  templateUrl: "./mobile-navigation.component.html",
  styleUrls: ["./mobile-navigation.component.scss"],
  providers: [CreatePlaylistComponent],
})
export class MobileNavigationComponent implements OnInit {
  constructor(private createPlaylist: CreatePlaylistComponent) {}

  ngOnInit(): void {}

  public openModalCreatePlalist() {
    this.createPlaylist.openDialog();
  }
}
