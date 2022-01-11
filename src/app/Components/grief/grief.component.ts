import { Component, OnInit } from '@angular/core';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-grief',
  templateUrl: './grief.component.html',
  styleUrls: ['./grief.component.css']
})
export class GriefComponent implements OnInit {
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
    this.editservice.adminEdit().subscribe((res:any)=>{
      console.log(res);
      this.respo=res.Details;
      this.respo1=this.respo[26]
      this.respo2=this.respo[2]
      this.respo3=this.respo[28]
      this.respo4=this.respo[148];

    });
  }

  postEditData(editDataNew:any){
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
