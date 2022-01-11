import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  forgotAPI = "https://h2913228.stratoserver.net/API/public/updatePassword";

  saveEmailId:any;
  saveAuthToken:any;

  pwd:any='';
  pwd1:any='';

  constructor(
    private http:HttpClient
  ) { }



  forgotPassword(forgotData:any){
    return this.http.post(this.forgotAPI,forgotData);
  }
}

