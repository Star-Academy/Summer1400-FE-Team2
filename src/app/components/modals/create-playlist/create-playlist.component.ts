import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EngineService } from "src/app/service/engine.service";
import { ToastService } from "../../toast/toast.service";

@Component({
  selector: "app-create-playlist",
  templateUrl: "./create-playlist.component.html",
  styleUrls: ["./create-playlist.component.scss"],
})
export class CreatePlaylistComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private engine: EngineService,
    private toast: ToastService
  ) {}
  namePlaylist = "";
  ngOnInit(): void {}

  public openDialog() {
    const dialogRef = this.dialog.open(CreatePlaylistComponent, {
      data: {},
      panelClass: "my-custom-dialog-class",
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  public async createNewPlaylist() {
    if (this.namePlaylist !== "") {
      let success = await this.engine.postCreatePlaylist(this.namePlaylist);
      if (success) this.toast.openSnackBar("پلی لیست ساخته شد", "پیغام سرور");
      this.dialog.closeAll();
    } else this.toast.openSnackBar("لطفا نام را وارد کنید", "Spotify");
  }
}
