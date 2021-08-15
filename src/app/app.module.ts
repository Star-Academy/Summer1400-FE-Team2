import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MobileNavigationComponent } from './components/mobile-navigation/mobile-navigation.component';
import { CardComponent } from './components/card/card.component';
import { DesktopNavigationComponent } from './components/desktop-navigation/desktop-navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrentMusicComponent } from './components/current-music/current-music.component';

@NgModule({
  declarations: [
    AppComponent,
    MobileNavigationComponent,
    CardComponent,
    DesktopNavigationComponent,
    HeaderComponent,
    CurrentMusicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
