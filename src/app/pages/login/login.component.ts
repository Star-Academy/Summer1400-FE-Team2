import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import User from 'src/app/models/User';
import { EngineService } from 'src/app/service/engine.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginEmail='';
  loginUsername='';
  loginPassword ='';
  
  constructor(private engineService: EngineService,private router:Router) { }

  ngOnInit(): void {
  }
  welcomeUser(user_data:object,username:string){
    this.engineService.setToken(user_data["token" as keyof object]);
    this.engineService.setUserId(user_data["id" as keyof object]);
    this.engineService.setUsername(username);
    console.log("welcomeUser");
    this.router.navigateByUrl('home');
  }
  async loginBtnHandler(){
     let user = {
       email:this.loginEmail,
       password:this.loginPassword,
       username:this.loginUsername
     }
     
     const user_identity = await this.engineService.loginUser(new User(user));
     if(user_identity.hasOwnProperty('error')){
      console.log(user_identity["message" as keyof object]);
    }else{
      console.log(user_identity["token" as keyof object]);
      console.log(user_identity["id" as keyof object]);
      this.welcomeUser(user_identity,user.username);
    }

    }
    

}
