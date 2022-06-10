import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { style } from '@angular/animations';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginAllData:any;
  loginSaveData:any;
  public islogin:boolean=false;
  isVisible:boolean;
  isUser:boolean;
  eitpo:any;
  mapData:any;

  

  otherPage:boolean=false;
  hideMemorialImage:boolean=true;
  goPremiumLabel:boolean=false;
  divPosition:boolean=false;
  logoDisplay:boolean=false;
  isFooterLogin:boolean=true;
  
  userId:any;

  // loginAPI="https://h2913228.stratoserver.net/API/public/login";
  loginAPI="https://h2913228.stratoserver.net/API/public/login";
  forgotPassAPI="https://h2913228.stratoserver.net/API/public/forgotPassword";

  httpOptions = {
    headers: new HttpHeaders({ 
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin':'*',
         'Access-Control-Allow-Methods':'POST DELETE PUT GET',
         'Access-Control-Allow-Headers':'*',
    })
  }

  

  constructor(
    private http:HttpClient
  ) { }

  
  

  userLogin(loginData:any){
    // For server
    return this.http.post(this.loginAPI,loginData);

    // For Local    
    // return this.http.post('/loginApi' ,loginData,this.httpOptions);
  }

  forgotPassword(forgotCredencial:any){
    return this.http.post(this.forgotPassAPI,forgotCredencial);
  }

}
