import { NgModule } from "@angular/core";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { RouterModule, Routes } from "@angular/router";
import { CreatePlaylistComponent } from "./components/modals/create-playlist/create-playlist.component";
import { LayoutComponent } from "./layout/layout.component";
import { AllSongsComponent } from "./pages/all-songs/all-songs.component";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { LibraryComponent } from "./pages/library/library.component";
import { LoginComponent } from "./pages/login/login.component";
import { PlaylistComponent } from "./pages/playlist/playlist.component";
import { RegisterComponent } from "./pages/register/register.component";
import { GuardService } from "./service/guard.service";

const routes: Routes = [
  {
    path: "library",
    component: LayoutComponent,
    canActivate: [GuardService],
    children: [{ path: "", component: LibraryComponent }],
  },
  {
    path: "all-songs",
    component: LayoutComponent,
    children: [{ path: "**", component: AllSongsComponent }],
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "home",
    component: LayoutComponent,
    children: [{ path: "", component: LandingPageComponent }],
  },
  {
    path: "favorites",
    component: LayoutComponent,
    canActivate: [GuardService],
    children: [{ path: "", component: PlaylistComponent }],
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [GuardService,{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
})
export class AppRoutingModule {}
