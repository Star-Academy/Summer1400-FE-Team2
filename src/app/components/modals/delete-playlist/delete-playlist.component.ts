import { Component, OnInit, Inject, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";

import { PlaylistCardComponent } from "../../cards/playlist-card/playlist-card.component";

@Component({
  selector: "app-delete-playlist",
  templateUrl: "./delete-playlist.component.html",
  styleUrls: ["./delete-playlist.component.scss"],
})
export class DeletePlaylistComponent implements OnInit {
  constructor(
    public _dialog: MatDialog,
    public dialogRef: MatDialogRef<PlaylistCardComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  action = "";
  ngOnInit(): void {}
  onDeleteBtn() {
    this.action = "delete";
    console.log(this.action);
    this.dialogRef.close({ event: this.action });
  }
}
