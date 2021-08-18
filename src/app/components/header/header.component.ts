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

  ngOnInit(): void {}
  isLogedIn = this.enginService.getToken();
  username = this.enginService.getUsername();
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
