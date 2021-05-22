import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   showheader:boolean;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    if(this.auth.isAuthenticated){
      this.showheader=true;
    }
    else{
      this.showheader=false;
    }
  }

}
