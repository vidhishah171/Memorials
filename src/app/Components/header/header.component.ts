import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminEditService } from 'src/services/admin-edit.service';
import { FearturedMemorialService } from 'src/services/feartured-memorial.service';
import { HomeService } from 'src/services/home.service';
import { LoginService } from 'src/services/login.service';
import { AdminEditPopupComponent } from '../admin-edit/admin-edit-popup/admin-edit-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // formatLabel(value: number) {
  //   if (value >= 1000) {
  //     return Math.round(value / 1000) + ' y';
  //   }

    // return value;
  // }


  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  ageSearch:any='';

  sliderValue: number = 0;

  searchText:any;
  dataSearch: any;
  memorialData:any;
  searchResult:boolean=false;
  dataSearch1: any;
  respo: any;
  respo1: any;
  isvalid: boolean;
  showNewDiv: number;
  showLabel: any;
  respo2: any;
  respo3: any;
  respo4: any;
  respo5: any;
  respo6: any;
  respo7: any;

  constructor(
    public homeservice:HomeService,
    public featureService : FearturedMemorialService,
    public dialog : MatDialog,
    public editservice: AdminEditService,
    public loginservice:LoginService,

  ) { }

  ngOnInit(): void {
    this.getMemorials();
    this.editData();
  }

  

   

  searchMemorialCity(searchText:any){
    var searchCity=searchText.value.searchText;
    const formData2=new FormData();
    formData2.append('search_text',searchCity)

    this.homeservice.get(formData2).subscribe((res:any)=>{
      // JSON.parse(res);
      this.dataSearch = res;
      this.dataSearch1=res.Memorials;

     console.log(res);

     if(res.Memorials === ''){
       this.searchResult=true;
     }else{
       this.searchResult=true;
     }
    })
  }

  //featured memorial

  getMemorials(){
    this.featureService.getMemorials().subscribe(
    (memorial:any)=>{
     this.memorialData= memorial.Memorials;      
    },
    error=>{
      return error;
    })
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
}
}


openDialogue1(){
  this.isvalid=false;
}

editData(){
  this.editservice.adminEdit().subscribe((res:any)=>{
    console.log(res);
    this.respo=res.Details;
    this.respo1=this.respo[3];
    this.respo2=this.respo[0];
    this.respo3=this.respo[1];
    this.respo4=this.respo[2];
    this.respo5=this.respo[4];
    this.respo6=this.respo[5];
    this.respo7=this.respo[2];

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
