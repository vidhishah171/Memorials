import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // loginAPI="https://h2913228.stratoserver.net/API/public/login";
  loginAPI="https://h2913228.stratoserver.net/API/public/login";
  forgotPassAPI="https://h2913228.stratoserver.net/API/public/forgotPassword";

  constructor(
    private http:HttpClient
  ) { }


  userLogin(loginData:any){
    debugger;
    return this.http.post(loginData,this.loginAPI);
  }

  forgotPassword(forgotCredencial:any){
    return this.http.post(forgotCredencial,this.forgotPassAPI);
  }

}
