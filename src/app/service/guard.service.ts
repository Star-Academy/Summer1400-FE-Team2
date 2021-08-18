import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { EngineService } from "./engine.service";

@Injectable()
export class GuardService implements CanActivate {
  public constructor(private engineService: EngineService) {}
  public canActivate(): boolean {
    if (this.engineService.getToken() !== "") {
      return true;
    } else {
      this.engineService.shouldLogin();
      return false;
    }
  }
}
