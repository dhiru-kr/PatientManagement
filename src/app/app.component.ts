import { Component, OnInit } from '@angular/core';
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(ngbConfig: NgbConfig,private primengConfig: PrimeNGConfig) {
      ngbConfig.animation = false;
  }
  ngOnInit(): void {
      this.primengConfig.ripple = true;
  }
  title = 'Dr Ram Krishna Singh';
}
