import { Component, OnChanges, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import User from "src/app/models/User";
import { DataHandlerService } from "src/app/service/dataHandler/data-handler.service";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit, OnChanges {
  constructor(
    public _dialog: MatDialog,
    private _engine: EngineService,
    public _dataHandler: DataHandlerService
  ) {}

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
    this.username = this._dataHandler.user.username;
    this.firstName = this._dataHandler.user.firstName;
    this.lastName = this._dataHandler.user.lastName;
    this.avatar = this._dataHandler.user.avatar
      ? `url(${this._dataHandler.user.avatar})`
      : "url('/assets/Icons/user-profile.svg')";

    this.avatarLink = this._dataHandler.user.avatar
      ? `url(${this._dataHandler.user.avatar})`
      : "url('/assets/Icons/user-profile.svg')";
    this.password = this._dataHandler.user.password;
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
    let user = {
      token: this._engine.getToken(),
      username: this.username,
      first_name: this.firstName,
      last_name: this.lastName,
    };
    if (this.password !== "" && this.password !== undefined) {
      Object.assign(user, { password: this.password });
    }
    localStorage.setItem("username", this.username);
    await this._dataHandler
      .alterUser(new User(user))
      .then(() => this.setModalData());
  }

  public async onChangeAvatar(myfile: any) {
    let file = myfile.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      this.avatarLink = `${reader.result}`;
      this.avatar = reader.result + "";
      let user = {
        token: this._engine.getToken(),
        avatar: reader.result,
      };
      await this._dataHandler
        .alterUser(new User(user))
        .then(() => this.setModalData());
    };
  }
  public async onDeleteBtn() {
    this.avatarLink = "url('/assets/Icons/user-profile.svg')";
    this.avatar = "/assets/Icons/user-profile.svg";
    let user = {
      token: this._engine.getToken(),
      avatar: this.avatar,
    };
    await this._dataHandler
      .alterUser(new User(user))
      .then(() => this.setModalData());
  }
}
