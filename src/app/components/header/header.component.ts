import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isLogedIn:Boolean=false;
  fgoBack() {
    console.log('back');
    window.history.back();
  }
  fgoForward() {
    console.log('forward');
    window.history.forward();
  }
}
