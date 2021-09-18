import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import Playlist from "src/app/models/Playlist";
import { DataHandlerService } from "src/app/service/dataHandler/data-handler.service";
import { DeletePlaylistComponent } from "../../modals/delete-playlist/delete-playlist.component";

@Component({
  selector: "app-playlist-card",
  templateUrl: "./playlist-card.component.html",
  styleUrls: ["./playlist-card.component.scss"],
})
export class PlaylistCardComponent implements OnInit {
  constructor(private _dataHandle: DataHandlerService,private dialog:MatDialog,private router:Router) {}
  ngOnInit(): void {}

  @Input() public playlist!: Playlist;
  public default_img = "../../../assets/Icons/musical-note.svg";
  public default_artist = this._dataHandle.getUsername();
  
  public onDeleteBtn() {
  const dialogRef =   this.dialog.open(DeletePlaylistComponent, {
      backdropClass: 'backdropClass',      
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(action=>{
      if(action.event =='delete'){
       this._dataHandle.removePlaylist(this.playlist!.name, this.playlist.id).then(res=>res);
       this.router.navigateByUrl('/library');
      }
    })      
  }
  onMusicLink(){
    this.router.navigate(['/playlist',this.playlist.id])
  }
}
