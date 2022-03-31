import { Component, OnInit } from '@angular/core';
import { CreateMemorialService } from 'src/services/create-memorial.service';
import { LoginService } from 'src/services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service1: CreateMemorialService,private loginservice: LoginService) { 
    this.loginservice.otherPage = true;
    this.loginservice.divPosition = true;
    this.loginservice.isFooterLogin = false;
  }

  ngOnInit(): void {
    this.service1.createMemorial.g_firstname = '';
    this.service1.createMemorial.g_lastname = '';
    this.service1.createMemorial.birthplace = '';
    this.service1.createMemorial.deathplace = '';
    this.service1.createMemorial.DOB = '';
    this.service1.createMemorial.birthname = '';
    this.service1.createMemorial.DOD = '';

    this.service1.createMemorial.firstname = '';
    this.service1.createMemorial.lastname = '';
    this.service1.createMemorial.password = '';
    this.service1.createMemorial.password1 = '';
    this.service1.createMemorial.email = '';
    this.service1.createMemorial.streetname = '';
    this.service1.createMemorial.zipcode = '';
    this.service1.createMemorial.hometown = '';
    this.service1.createMemorial.voucher = '';
    this.service1.saveCanvas1 = '';
  }

}
