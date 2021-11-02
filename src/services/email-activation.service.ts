import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailActivationService {

  baseUrl:"https://h2913228.stratoserver.net/";

  ju:any;
  constructor(public http:HttpClient) { }


  emailActivation1(emailData){
    debugger;
    environment.baseUrl
    this.http.get(this.baseUrl,emailData);
  }
}
