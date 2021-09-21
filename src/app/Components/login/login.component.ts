import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private service : LoginService
  ) { }

  ngOnInit(): void {
  }

  login(logData:any){
    debugger;
       
    this.service.userLogin(logData.value).subscribe(responce=>{
        console.log(responce);
      },
      error=>{
        console.log(error);
        
      }
    )
    
    
  }

}
