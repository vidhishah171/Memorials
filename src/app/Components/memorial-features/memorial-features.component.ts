import { Component, OnInit } from '@angular/core';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-memorial-features',
  templateUrl: './memorial-features.component.html',
  styleUrls: ['./memorial-features.component.css']
})
export class MemorialFeaturesComponent implements OnInit {
  showNewDiv: number;
  isvalid: boolean;
  respo: any;
  respo1: any;
  respo2: any;
  respo3: any;
  respo4: any;
  respo5: any;
  respo6: any;
  respo7: any;
  respo8: any;
  respo9: any;

  constructor(
    public editservice: AdminEditService,
    public loginservice:LoginService,

  ) { }

  ngOnInit(): void {
    this.editData();
  }

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
  }else if(num==6){
    this.showNewDiv=6;
    this.isvalid=true;
  }else if(num==7){
    this.showNewDiv=7;
    this.isvalid=true;
  }else if(num==8){
    this.showNewDiv=8;
    this.isvalid=true;
  }else if(num==9){
    this.showNewDiv=9;
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
      this.respo1=this.respo[7]
      this.respo2=this.respo[8]
      this.respo3=this.respo[9]
      this.respo4=this.respo[10]
      this.respo5=this.respo[11]
      this.respo6=this.respo[12]
      this.respo7=this.respo[13]
      this.respo8=this.respo[14]
      this.respo9=this.respo[15]
  
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
