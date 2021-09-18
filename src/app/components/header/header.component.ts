import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private _engine: EngineService, private _router: Router) {}
  public searchText: string = "";

  ngOnInit(): void {
    window.addEventListener('click', (event)=>{
      const dropdown = document.querySelector('.dropdown-content');
      const dropbtn = document.querySelector('.dropbtn');
      if (event.target != dropdown && (<HTMLElement>event.target).parentNode!=dropdown && event.target !=dropbtn && (<HTMLElement>event.target).parentNode!=dropbtn){
            this.isDropDownVisible = false;
        }
    });
  }
  isLogedIn = this._engine.getToken();
  username = this._engine.getUsername();
  isDropDownVisible = false;
  public sendToSongs() {
    if (this.searchText !== "") {
      this._router.navigateByUrl("all-songs?search=" + this.searchText);
    }
  }

  fgoBack() {
    window.history.back();
  }

  fgoForward() {
    window.history.forward();
  }

  onLogoutBtn() {
    this._engine.logout();
    this._router.navigateByUrl("login");
  }

  onUserProfileBtn() {
    this._router.navigateByUrl("library");
  }
  showDropDown() {
    this.isDropDownVisible = !this.isDropDownVisible;
  }
}
