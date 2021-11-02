import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from 'src/services/forgot-password.service';

@Component({
  selector: 'app-forgot-password-activation-pop',
  templateUrl: './forgot-password-activation-pop.component.html',
  styleUrls: ['./forgot-password-activation-pop.component.css']
})
export class ForgotPasswordActivationPopComponent implements OnInit {
  forPassword: any;
  

  constructor(
    public service:ForgotPasswordService,
  ) { }

  ngOnInit(): void {
  }


  register(data:any){
    debugger;
    this.forPassword=data.value;
    var formdata= new FormData();
    formdata.append('email_id', this.service.saveEmailId);
    formdata.append('auth_token', this.service.saveAuthToken);
    formdata.append('pwd',this.forPassword.pwd);
     
    this.service.forgotPassword(formdata).subscribe(responce=>{
      console.log(responce);
    })
    this.service.pwd='';
    this.service.pwd1='';
  }
}
