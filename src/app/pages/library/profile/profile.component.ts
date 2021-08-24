import { Component, OnInit } from "@angular/core";
import User from "src/app/models/User";
import { EngineService } from "src/app/service/engine.service";
import { EditProfileComponent } from "src/app/components/modals/edit-profile/edit-profile.component";
import { DataHandlerService } from "src/app/service/dataHandler/data-handler.service";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  providers: [EditProfileComponent],
})
export class ProfileComponent implements OnInit {
  constructor(
    private _engine: EngineService,
    private editModal: EditProfileComponent,
    public _dataHandler: DataHandlerService
  ) {}

  ngOnInit(): void {}

  async onChangeAvatar(myfile: any) {
    let file = myfile.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      let user = {
        token: this._engine.getToken(),
        avatar: reader.result,
      };
      await this._dataHandler.alterUser(new User(user));
    };
  }

  onEditProfile() {
    this.editModal.openDialog();
  }
  getProfileUrl(){
    return `url(${this._dataHandler.user.avatar})` || '../assets/Icons/user-profile.svg';
  }
}
