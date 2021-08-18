import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from "@angular/core";
import User from "src/app/models/User";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit, OnChanges {
  constructor(public enginService: EngineService) {}

  ngOnInit(): void {
    this.showUserInfo();
  }
  ngOnChanges() {}

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
    this.avatar = user_data["avatar" as keyof object]
      ? `url(${user_data["avatar" as keyof object]})`
      : "url('/assets/Icons/user-profile.svg')";
  }
  async onChangeAvatar(myfile: any) {
    let file = myfile.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      this.avatar = `url(${reader.result})`;
      let user = {
        token: this.enginService.getToken(),
        avatar: reader.result,
      };
      await this.enginService.alterUserInfo(new User(user));
    };
  }
}
