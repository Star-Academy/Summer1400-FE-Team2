import { Component, OnChanges, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import User from "src/app/models/User";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit, OnChanges {
  constructor(public _dialog: MatDialog, private _engine: EngineService) {}

  ngOnInit(): void {
    this.setModalData();
  }
  ngOnChanges() {
    this.setModalData();
  }
  public avatarLink = "";
  public username = "";
  public firstName = "";
  public lastName = "";
  public password = "";
  public avatar = "";
  public async setModalData() {
    let id = this._engine.getUserId();
    const user_data = await this._engine.getUser(id);
    this.username = user_data["username" as keyof object];
    this.firstName = user_data["first_name" as keyof object];
    this.lastName = user_data["last_name" as keyof object];
    this.avatar = user_data["avatar" as keyof object]
      ? user_data["avatar" as keyof object]
      : "/assets/Icons/user-profile.svg";

    this.avatarLink = user_data["avatar" as keyof object]
      ? `url(${user_data["avatar" as keyof object]})`
      : "url('/assets/Icons/user-profile.svg')";
    this.password = user_data["password" as keyof object];
  }
  public openDialog() {
    const dialogRef = this._dialog.open(EditProfileComponent, {
      data: {},
      panelClass: "my-custom-dialog-class",
      width: "550px",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  public async onSaveModal() {
    let user_info = {};
    user_info = {
      token: this._engine.getToken(),
      username: this.username,
      avatar: this.avatar,
      firstName: this.firstName,
      lastName: this.lastName,
    };

    if (this.password !== "" && this.password !== undefined) {
      Object.assign(user_info, { password: this.password });
    }
    localStorage.setItem("username", this.username);
    await this._engine.alterUserInfo(new User(user_info));
  }

  public async onChangeAvatar(myfile: any) {
    let file = myfile.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      this.avatarLink = `url(${reader.result})`;
      this.avatar = reader.result + "";
      let user = {
        token: this._engine.getToken(),
        avatar: reader.result,
      };
      await this._engine.alterUserInfo(new User(user));
    };
  }
  public async onDeleteBtn() {
    this.avatarLink = "url('/assets/Icons/user-profile.svg')";
    this.avatar = "/assets/Icons/user-profile.svg";
    let user = {
      token: this._engine.getToken(),
      avatar: this.avatar,
    };
    await this._engine.alterUserInfo(new User(user));
  }
}
