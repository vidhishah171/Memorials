import { Component,OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';
import { AdminEditPopupComponent } from '../admin-edit/admin-edit-popup/admin-edit-popup.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  

  p=this.loginservice.loginSaveData;
  isvalid:boolean=false;
  respo: any;
  respo1: any;
  respo2: any;
  showNewDiv: number;
  respo3: any;
  respo4: any;
  respo5: any;
  respo6: any;
  showLabel: number;
  isVisible: boolean;
  respo7: any;
  respo8: any;
  loginData: any;
  condition: boolean;
  constructor(
    public loginservice:LoginService,
    public dialog:MatDialog,
    public editservice:AdminEditService,
    public router:Router
  ) { }

  ngOnInit(): void {
    // this.p=this.loginservice.loginSaveData;
    // this.p=this.loginservice.loginSaveData
    // var username=this.loginservice.loginSaveData.user
    debugger
    this.getData();
    this.editData();
    this.buttonLanguage(this.editservice.numLabel);
   }
   getData() {
     debugger
    var userLoginData = sessionStorage.getItem('myData')
    var loginAfterRefresh = JSON.parse(userLoginData);

    if (loginAfterRefresh) {
      debugger
      this.loginData = loginAfterRefresh.user[0].firstname;
      this.loginservice.loginSaveData = this.loginData;
      this.loginservice.loginAllData = loginAfterRefresh.user[0];
      this.loginservice.islogin = true;
    } else {
      // this.router.navigate(['/login']);
      this.condition = true;
      // this.snackBar("Please check Email and password", "alert-danger");
    }
  }

  //  For logout
  userLogout(){
    debugger;
    sessionStorage.clear();
    setTimeout(() => {
      this.router.navigate([''])
      .then(() => {
        window.location.reload();
      });
    },1);
  }

   openDialogue(num): void{
    // const dialogRef = this.dialog.open(AdminEditPopupComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    // if(this.isvalid == true){
    //   this.respo;
    // }
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
    }

  }

  buttonLanguage(num){
    if(num==1){
      this.showLabel=1;
    }else if(num==2){
      this.showLabel=2;
    }else if(num==3){
      this.showLabel=3;
    }else{
    }
    this.editservice.numLabel=num;
  }

  openDialogue1(){
    this.isvalid=false;
  }

  editData(){
    this.editservice.adminEdit().subscribe((res:any)=>{
      console.log(res);
      this.respo=res.Details;
      this.respo1=this.respo[29];
      this.respo2=this.respo[30];
      this.respo3=this.respo[42];
      this.respo4=this.respo[32];
      this.respo5=this.respo[36];
      this.respo6=this.respo[37];
      this.respo7=this.respo[37];
      this.respo8=this.respo[194];


    });
  }

  // loginServiceData(){
  //   if(this.loginservice.loginSaveData==undefined){
  //     this.isVisible=false;
  //   }else{
  //     this.isVisible=true;
  //   }
  // }

  
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


