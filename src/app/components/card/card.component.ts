import { Component, Input, OnInit } from '@angular/core';
import Song from 'src/app/models/SongModal';
import Playlist from 'src/app/models/Playlist';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
public title:string = `card`;
@Input() public song!: Song;
@Input() public playlist!: Playlist;
default_img = '../../../assets/Icons/musical-note.svg';
default_artist = localStorage.getItem('username');
  constructor() { }

  ngOnInit(): void {
  }

}
