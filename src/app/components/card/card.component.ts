import { Component, Input, OnInit } from '@angular/core';
import Song from 'src/app/models/SongModal';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
public title:string = `card`;
@Input() public song!: Song;
  constructor() { }

  ngOnInit(): void {
  }

}
