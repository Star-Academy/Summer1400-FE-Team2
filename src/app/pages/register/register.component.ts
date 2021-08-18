import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import User from "src/app/models/User";
import { EngineService } from "src/app/service/engine.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerEmail = "";
  registerFirstName = "";
  registerLastName = "";
  registerPassword = "";
  registerUsername = "";

  constructor(private engineService: EngineService, private router: Router) {}

  ngOnInit(): void {}
  async onRegisterBtn() {
    let user = {
      username: this.registerUsername,
      email: this.registerEmail,
      password: this.registerPassword,
      firstName: this.registerFirstName,
      lastName: this.registerLastName,
    };
    console.log(user);
    console.log(new User(user));
    const user_identity = await this.engineService.registerUser(new User(user));
    if (user_identity.hasOwnProperty("error")) {
      alert(user_identity["message" as keyof object]);
    } else {    
      const user_data = await this.engineService.getUser(user_identity["id" as keyof object]);
      console.log(user_data);
      this.engineService.welcomeUser(user_identity, user.username);
    }
  }
}
