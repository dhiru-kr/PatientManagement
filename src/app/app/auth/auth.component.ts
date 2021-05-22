import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router'
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user.model';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user:User;
  LoginDialog:boolean=true;
  constructor(private route:Router, private auth:AuthService) {
    this.auth.isAuthenticated=false;
    this.LoginPage();
   }

  ngOnInit(): void {
  }
  LoginPage(){
    this.user={} as User;
  }
  logIn(){
    debugger;
    this.auth.getlogin(this.user).subscribe(data => {
      debugger;
          if(data){
            this.auth.isAuthenticated=true;
            this.route.navigate(['/Home']);
          }
          else{
            this.auth.isAuthenticated=false;
            this.LoginPage();
            this.route.navigate(['/']);
          }
      });

    
  }

}
