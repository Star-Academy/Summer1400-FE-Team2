import { Component, OnInit } from "@angular/core";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  constructor(private enginService: EngineService) {}

  ngOnInit(): void {
    this.showUserInfo();
  }

  first_name = "";
  last_name = "";
  email = "";
  avatar = "";
  username = "";
  async showUserInfo() {
    let id = this.enginService.getUserId();
    const user_data = await this.enginService.getUser(id);    
    this.username = user_data["username" as keyof object];
    this.first_name = user_data["first_name" as keyof object];
    this.last_name = user_data["last_name" as keyof object];
  }
}
