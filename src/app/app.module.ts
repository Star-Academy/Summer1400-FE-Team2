import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MobileNavigationComponent } from "./components/mobile-navigation/mobile-navigation.component";
import { CardComponent } from "./components/cards/card/card.component";
import { DesktopNavigationComponent } from "./components/desktop-navigation/desktop-navigation.component";
import { HeaderComponent } from "./components/header/header.component";
import { CurrentMusicComponent } from "./components/current-music/current-music.component";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { AllSongsComponent } from "./pages/all-songs/all-songs.component";
import { MusicPlayerComponent } from "./pages/music-player/music-player.component";
import { PlaylistComponent } from "./pages/playlist/playlist.component";
import { LibraryComponent } from "./pages/library/library.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { LayoutComponent } from "./layout/layout.component";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ProfileComponent } from "./pages/library/profile/profile.component";
import { CreatePlaylistComponent } from "./components/modals/create-playlist/create-playlist.component";
import { EditProfileComponent } from "./components/modals/edit-profile/edit-profile.component";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { PlaylistCardComponent } from "./components/cards/playlist-card/playlist-card.component";
import { AddPlaylistComponent } from "./components/modals/add-playlist/add-playlist.component";
import { SongItemComponent } from "./pages/playlist/song-item/song-item.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DeletePlaylistComponent } from "./components/modals/delete-playlist/delete-playlist.component";
import { MatMenuModule } from "@angular/material/menu";
import {MatIconModule} from '@angular/material/icon';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';

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
    LayoutComponent,
    ProfileComponent,
    CreatePlaylistComponent,
    EditProfileComponent,
    PlaylistCardComponent,
    AddPlaylistComponent,
    SongItemComponent,
    SpinnerComponent,
    DeletePlaylistComponent,
    ClickStopPropagationDirective,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, LibraryComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
