import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import User from "src/app/models/User";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginEmail = "";
  loginUsername = "";
  loginPassword = "";

  constructor(private _engine: EngineService) {}

  ngOnInit(): void {}

  async loginBtnHandler() {
    let user = {
      email: this.loginEmail,
      password: this.loginPassword,
      username: this.loginUsername,
    };

    const success = await this._engine.loginUser(new User(user));
    if (success) this._engine.welcomeUser();
  }
}
