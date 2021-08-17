import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { EngineService } from 'src/app/service/engine.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private engineService: EngineService) { }

  ngOnInit(): void {
  }
   loginEmail='';
   loginUsername='';
   loginPassword ='';
   loginBtnHandler(){
     console.log(this.loginEmail);
     console.log(this.loginPassword);
     console.log(this.loginUsername);
     let user = {
       email:this.loginEmail,
       password:this.loginPassword,
       username:this.loginUsername
     }
     try {
      this.engineService.loginUser(new User(user));
     } catch (error) {
       console.log(error);
     }
    }

}
