import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private enginService: EngineService, private router: Router) {}
  public searchText: string = "";
  ngOnInit(): void {}
  isLogedIn = this.enginService.getToken();
  username = this.enginService.getUsername();

  public sendToSongs() {
    if (this.searchText !== "") {
      this.router.navigateByUrl("all-songs?search=" + this.searchText);
    }
  }

  fgoBack() {
    window.history.back();
  }
  fgoForward() {
    window.history.forward();
  }
  onLogoutBtn() {
    localStorage.clear();
    this.router.navigateByUrl("login");
  }
  onUserProfileBtn() {
    this.router.navigateByUrl("library");
  }
}
