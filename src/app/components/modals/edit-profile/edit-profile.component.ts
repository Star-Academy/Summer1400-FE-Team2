import { Component, OnInit, Inject, Injector } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
  // ,@Inject(MAT_DIALOG_DATA) public data: {name:string,avatar:string}
  constructor(public dialog: MatDialog) {}
  avatarLink = "";
  username = "";
  public openDialog(name: string, avatar: string) {
    console.log(name, avatar);
    this.avatarLink = `url('${avatar}')`;
    this.username = name;
    const dialogRef = this.dialog.open(EditProfileComponent, {
      data: {},
      panelClass: "my-custom-dialog-class",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {}
}
