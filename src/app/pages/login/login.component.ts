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

  constructor(private engineService: EngineService, private router: Router) {}

  ngOnInit(): void {}

  async loginBtnHandler() {
    let user = {
      email: this.loginEmail,
      password: this.loginPassword,
      username: this.loginUsername,
    };

    const user_identity = await this.engineService.loginUser(new User(user));
    if (user_identity.hasOwnProperty("error")) {
      alert(user_identity["message" as keyof object]);
    } else {
      this.engineService.welcomeUser(user_identity, user.username);
    }
  }
}
