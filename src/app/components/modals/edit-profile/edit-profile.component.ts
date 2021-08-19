import { Component, OnChanges, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import User from "src/app/models/User";
import { ProfileComponent } from "src/app/pages/library/profile/profile.component";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit, OnChanges {
  constructor(public dialog: MatDialog, private engine: EngineService) {}

  ngOnInit(): void {
    this.setModalData();
  }
  ngOnChanges() {
    this.setModalData();
  }
  avatarLink = "";
  username = "";
  firstName = "";
  lastName = "";
  password = "";
  avatar = "";
  async setModalData() {
    let id = this.engine.getUserId();
    const user_data = await this.engine.getUser(id);
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
    console.log(user_data);
  }
  public openDialog() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      data: {},
      panelClass: "my-custom-dialog-class",
      width: "550px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  async onSaveModal() {
    let user_info = {};
    user_info = {
      token: this.engine.getToken(),
      username: this.username,
      avatar: this.avatar,
      firstName: this.firstName,
      lastName: this.lastName,
    };

    if (this.password !== "" && this.password !== undefined) {
      Object.assign(user_info, { password: this.password });
    }
    localStorage.setItem('username',this.username);
    // if(this.username !==this.engine.getUsername()){
    //   // add username to alter
    // }
    console.log(user_info);
    await this.engine.alterUserInfo(new User(user_info));
  }

  async onChangeAvatar(myfile: any) {
    let file = myfile.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      this.avatarLink = `url(${reader.result})`;
      this.avatar = reader.result+'';
      let user = {
        token: this.engine.getToken(),
        avatar: reader.result,
      };
      await this.engine.alterUserInfo(new User(user));
    };
  }
   async onDeleteBtn(){
    this.avatarLink = "url('/assets/Icons/user-profile.svg')";
    this.avatar ='/assets/Icons/user-profile.svg';
    let user = {
      token: this.engine.getToken(),
      avatar: this.avatar,
    };
    await this.engine.alterUserInfo(new User(user));
  }
}
