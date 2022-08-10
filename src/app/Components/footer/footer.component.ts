import { Component, OnInit } from '@angular/core';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isvalid: boolean;
  showNewDiv: number;
  respo: any;
  respo1: any;
  respo2: any;
  respo3: any;
  respo4: any;
  respo5: any;
  constructor(
    public editservice: AdminEditService,
    public loginservice:LoginService,
  ) { }

  ngOnInit(): void {
    this.editData();
  }
   // Code for labels
   openDialogue(num): void{
   
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
  }else if(num==5){
    this.showNewDiv=5;
    this.isvalid=true;
  }
  }
  openDialogue1(){
    this.isvalid=false;
  }
  editData(){
    this.editservice.adminEdit().subscribe((res:any)=>{
      this.respo=res.Details;
      this.respo1=this.respo[29];
      this.respo2=this.respo[30];
      this.respo3=this.respo[42];
      this.respo4=this.respo[32];
      this.respo5=this.respo[250];
    });
  }
  postEditData(editDataNew:any){
    var formdata=new FormData();
    formdata.append('id',editDataNew.value.id);
    formdata.append('en',editDataNew.value.en);
    formdata.append('de',editDataNew.value.de);
    formdata.append('fr',editDataNew.value.fr);
  
    this.editservice.editPostData(formdata).subscribe(response=>{

    })
  }
}
