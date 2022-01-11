import { Component, OnInit } from '@angular/core';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-forgot-pass-popup',
  templateUrl: './forgot-pass-popup.component.html',
  styleUrls: ['./forgot-pass-popup.component.css']
})
export class ForgotPassPopupComponent implements OnInit {
  showNewDiv: number;
  isvalid: boolean;
  respo: any;
  respo1: any;
  respo2: any;
  respo3: any;
  respo4: any;

  
  constructor(
    public editservice: AdminEditService,
    public loginservice:LoginService,

  ) { }

  ngOnInit(): void {
    this.editData();
  }


  // Code for labels

  openDialogue(num): void{
    debugger
   
   if(num==1){
     this.showNewDiv=1;
     this.isvalid=true;
   }else if(num==2){
     this.showNewDiv=2;
     this.isvalid=true;
   }else if(num==3){
    this.showNewDiv=3;
    this.isvalid=true;
  }else if(num==4){
    this.showNewDiv=4;
    this.isvalid=true;
  }

  }

  openDialogue1(){
    this.isvalid=false;
  }


  editData(){
    debugger;
    this.editservice.adminEdit().subscribe((res:any)=>{
      console.log(res);
      this.respo=res.Details;
      this.respo1=this.respo[157];
      this.respo2=this.respo[158];
      this.respo3=this.respo[159];
      this.respo4=this.respo[160];
    });
  }

  postEditData(editDataNew:any){
    debugger;
    var formdata=new FormData();
    formdata.append('id',editDataNew.value.id);
    formdata.append('en',editDataNew.value.en);
    formdata.append('de',editDataNew.value.de);
    formdata.append('fr',editDataNew.value.fr);
  
    this.editservice.editPostData(formdata).subscribe(response=>{
      console.log(response);
    })
  }


}
