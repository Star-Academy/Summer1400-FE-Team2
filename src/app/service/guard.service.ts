import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class GuardService implements CanActivate {

  constructor() { }
  public canActivate():boolean{
    if(localStorage.getItem('token')){
      return true;
    }else{
      console.log('first login');
      return false;
    }
  }
}
