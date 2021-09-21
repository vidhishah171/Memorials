import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private service : LoginService
  ) { }

  ngOnInit(): void {
  }

  forgotPassword(forgotData:any){
    this.service.forgotPassword(forgotData)
    .subscribe(
      responce=>{
        console.log(responce);
        
      },
      error=>{
        console.log(error);
        
      }
    )
  }

}
