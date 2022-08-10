import { Component, OnInit } from '@angular/core';
import { CreateMemorialService } from 'src/services/create-memorial.service';
import { LoginService } from 'src/services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service1: CreateMemorialService, private loginservice: LoginService) {
    this.loginservice.otherPage = true;
    this.loginservice.divPosition = true;
    this.loginservice.isFooterLogin = false;
  }
  ngOnInit(): void {
  }
}
