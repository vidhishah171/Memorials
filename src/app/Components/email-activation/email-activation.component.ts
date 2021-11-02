import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailActivationService } from 'src/services/email-activation.service';

@Component({
  selector: 'app-email-activation',
  templateUrl: './email-activation.component.html',
  styleUrls: ['./email-activation.component.css']
})
export class EmailActivationComponent implements OnInit {


  public subscription: Subscription ;
  token: any;
  emailActivationStatus:boolean=false;

  constructor(private route:ActivatedRoute, public http:HttpClient) { }

  ngOnInit(): void {
    this.emailActivation();
  }

  emailActivation(){
    debugger;
      this.subscription =this.route.queryParamMap.subscribe(queryParams=>{
         this.token=queryParams.get('authToken');
        //  this.service.ju=queryParams;
        let url= environment.baseUrl+"API/public/userAuth/" + this.token;
        this.http.get(url).subscribe((result:any)=>
          {
                debugger;
                 if(result.status === 'success'){
                   this.emailActivationStatus=true;
                 }else{
                   this.emailActivationStatus=false;
                 }
               });
      
            //    s = JSON.stringify(s,null,4).replace(/[{}]/g, '');
            // alert(s);
       });
     }
}
