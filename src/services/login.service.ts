import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginSaveData:any;
  public islogin:boolean=false;

  // loginAPI="https://h2913228.stratoserver.net/API/public/login";
  loginAPI="https://h2913228.stratoserver.net/API/public/login";
  forgotPassAPI="https://h2913228.stratoserver.net/API/public/forgotPassword";


  

  constructor(
    private http:HttpClient
  ) { }

  
  

  userLogin(loginData:any){
    debugger
    return this.http.post(this.loginAPI,loginData);
  }

  forgotPassword(forgotCredencial:any){
    debugger;
    return this.http.post(this.forgotPassAPI,forgotCredencial);
  }

}
