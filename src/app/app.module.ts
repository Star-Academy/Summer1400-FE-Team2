import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MobileNavigationComponent } from './components/mobile-navigation/mobile-navigation.component';
import { CardComponent } from './components/card/card.component';
import { DesktopNavigationComponent } from './components/desktop-navigation/desktop-navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrentMusicComponent } from './components/current-music/current-music.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AllSongsComponent } from './pages/all-songs/all-songs.component';
import { MusicPlayerComponent } from './pages/music-player/music-player.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { LibraryComponent } from './pages/library/library.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    MobileNavigationComponent,
    CardComponent,
    DesktopNavigationComponent,
    HeaderComponent,
    CurrentMusicComponent,
    LandingPageComponent,
    AllSongsComponent,
    MusicPlayerComponent,
    PlaylistComponent,
    LibraryComponent,
    LoginComponent,
    RegisterComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
