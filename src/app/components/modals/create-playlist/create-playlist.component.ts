import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DataHandlerService } from "src/app/service/dataHandler/data-handler.service";
import { EngineService } from "src/app/service/engine.service";
import { ToastService } from "../../toast/toast.service";

@Component({
  selector: "app-create-playlist",
  templateUrl: "./create-playlist.component.html",
  styleUrls: ["./create-playlist.component.scss"],
})
export class CreatePlaylistComponent implements OnInit {
  constructor(
    public _dialog: MatDialog,
    private _engine: EngineService,
    private _toast: ToastService,
    private _dataHandle: DataHandlerService
  ) {}
  namePlaylist = "";
  ngOnInit(): void {}

  public openDialog() {
    if (!this._engine.getToken()) {
      this._engine.shouldLogin();
      return;
    }
    const dialogRef = this._dialog.open(CreatePlaylistComponent, {
      data: {},
      panelClass: "my-custom-dialog-class",
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  public async createNewPlaylist() {
    if (this.namePlaylist !== "") {
      let success = await this._dataHandle.addPlaylist(this.namePlaylist);
      if (success) this._toast.openSnackBar("پلی لیست ساخته شد", "پیغام سرور");
      this._dialog.closeAll();
    } else this._toast.openSnackBar("لطفا نام را وارد کنید", "Spotify");
  }
}
