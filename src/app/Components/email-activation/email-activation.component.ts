import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminEditService } from 'src/services/admin-edit.service';
import { EmailActivationService } from 'src/services/email-activation.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-email-activation',
  templateUrl: './email-activation.component.html',
  styleUrls: ['./email-activation.component.css']
})
export class EmailActivationComponent implements OnInit {


  public subscription: Subscription ;
  token: any;
  emailActivationStatus:boolean=false;
  showNewDiv: number;
  isvalid: boolean;
  respo1: any;
  respo: any;
  respo2: any;
  respo3: any;
  respo4: any;
  respo5: any;
  respo6: any;

  constructor(private route:ActivatedRoute,
    public http:HttpClient,
    public editservice: AdminEditService,
    public loginservice:LoginService,
    
    ) { }

  ngOnInit(): void {
    this.emailActivation();
    this.editData();

  }

  emailActivation(){
      this.subscription =this.route.queryParamMap.subscribe(queryParams=>{
         this.token=queryParams.get('authToken');
        //  this.service.ju=queryParams;
        let url= environment.baseUrl+"API/public/userAuth/" + this.token;
        this.http.get(url).subscribe((result:any)=>
          {
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



      // Code for labels

  openDialogue(num): void {

    if (num == 1) {
      this.showNewDiv = 1;
      this.isvalid = true;
    } else if (num == 2) {
      this.showNewDiv = 2;
      this.isvalid = true;
    } else if (num == 3) {
      this.showNewDiv = 3;
      this.isvalid = true;
    } else if (num == 4) {
      this.showNewDiv = 4;
      this.isvalid = true;
    } else if (num == 5) {
      this.showNewDiv = 5;
      this.isvalid = true;
    } else if (num == 6) {
      this.showNewDiv = 6;
      this.isvalid = true;
    }
  }

  openDialogue1() {
    this.isvalid = false;
  }

  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      console.log(res);
      this.respo = res.Details;
      // For step-2 label
      this.respo1 = this.respo[170];
      this.respo2 = this.respo[171];
      this.respo3 = this.respo[172];
      this.respo4 = this.respo[173];
      this.respo5 = this.respo[174];
      this.respo6 = this.respo[175];
      // 175
    });
  }

  postEditData(editDataNew: any) {
    var formdata = new FormData();
    formdata.append('id', editDataNew.value.id);
    formdata.append('en', editDataNew.value.en);
    formdata.append('de', editDataNew.value.de);
    formdata.append('fr', editDataNew.value.fr);

    this.editservice.editPostData(formdata).subscribe(response => {
      console.log(response);
    })
  }




}
