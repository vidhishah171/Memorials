import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  p=this.loginservice.loginSaveData;
  constructor(
    public loginservice:LoginService,
  ) { }

  ngOnInit(): void {
    // this.p=this.loginservice.loginSaveData;
    // this.p=this.loginservice.loginSaveData
    // var username=this.loginservice.loginSaveData.user
   }

  
}
