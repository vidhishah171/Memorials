import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ForgotPasswordService } from 'src/services/forgot-password.service';
import { LoginService } from 'src/services/login.service';
import { ForgotPasswordActivationPopComponent } from './forgot-password-activation-pop/forgot-password-activation-pop.component';

@Component({
  selector: 'app-forgot-password-activation',
  templateUrl: './forgot-password-activation.component.html',
  styleUrls: ['./forgot-password-activation.component.css']
})
export class ForgotPasswordActivationComponent implements OnInit {

  public subscription: Subscription ;
  token: any;
  constructor(
    public dialog:MatDialog,
    public route:ActivatedRoute,
    public http:HttpClient,
    public service:ForgotPasswordService

  ) { }

  ngOnInit(): void {
    this.forgotPasswordActivation();
    this.openDialogue();
  }

  forgotPasswordActivation(){
    debugger;
      this.subscription =this.route.queryParamMap.subscribe(queryParams=>{
         this.token=queryParams.get('auth_token');
         this.service.saveAuthToken=this.token;
        let url= environment.baseUrl+"API/public/userAuth/" + this.token;
        this.http.get(url).subscribe((result:any)=>
          {
            console.log(result);
          });
        });
      }
      





  openDialogue(){
      const dialogRef = this.dialog.open(ForgotPasswordActivationPopComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
}
