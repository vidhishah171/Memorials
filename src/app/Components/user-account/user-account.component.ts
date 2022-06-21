import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminEditService } from 'src/services/admin-edit.service';
import { CreateMemorialService } from 'src/services/create-memorial.service';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { UserProfileService } from 'src/services/user-profile.service';
import { UserSearchPopupComponent } from './user-search-popup/user-search-popup.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  showDiv: number;
  isShow: boolean;
  getUserMemoData: any;
  condition: boolean;
  loginData: any;
  respo: any;
  respo2: any;
  respo3: any;
  respo4: any;
  respo5: any;
  respo6: any;
  respo7: any;
  respo8: any;
  respo9: any;
  respo10: any;
  respo11: any;
  respo12: any;
  showNewDiv1: number;
  isvalid1: boolean;
  respo13: any;
  respo14: any;
  respo15: any;
  respo16: any;
  respo17: any;
  respo18: any;
  respo19: any;
  respo20: any;
  respo21: any;
  respo22: any;
  respo23: any;
  respo24: any;
  respo25: any;
  respo26: any;
  respo27: any;
  respo28: any;
  respo29: any;


  caroucelCount: number = 1;
  getUserMemoDataUser: any;
  Memorials: any;
  respo30: any;


  constructor(
    public loginservice: LoginService,
    public profileService: UserProfileService,
    private router: Router,
    public service : RecentMeorialsService,
    public editservice: AdminEditService,
    private service1: CreateMemorialService,
    public dialog: MatDialog,


  ) {
     this.loginservice.otherPage = false;
     this.loginservice.hideMemorialImage = false;
     this.loginservice.goPremiumLabel = true;
    this.loginservice.isFooterLogin = true;
    

  }
  ngAfterViewInit():void{
    setTimeout(() => {
      this.clickDiv();
    }, 1000);
    this.clickShowStepBtn1();
    this.getUserMemorial();

  }

  ngOnInit(): void {

    // For clear create memorial page after goes to another page
    this.service1.createMemorial.g_firstname = '';
    this.service1.createMemorial.g_lastname = '';
    this.service1.createMemorial.birthplace = '';
    this.service1.createMemorial.deathplace = '';
    this.service1.createMemorial.DOB = '';
    this.service1.createMemorial.birthname = '';
    this.service1.createMemorial.DOD = '';

    this.service1.createMemorial.firstname = '';
    this.service1.createMemorial.lastname = '';
    this.service1.createMemorial.password = '';
    this.service1.createMemorial.password1 = '';
    this.service1.createMemorial.email = '';
    this.service1.createMemorial.streetname = '';
    this.service1.createMemorial.zipcode = '';
    this.service1.createMemorial.hometown = '';
    this.service1.createMemorial.voucher = '';
    this.service1.saveCanvas1 = '';


    this.getData()
    this.getUserMemorial();
    this.editData();
    this.getrecentMemorials();
  }

  clickDiv(){
      
      var test = document.getElementById("navDiv");
        if (test != null) {
          test.style.position = 'absolute';
        }
  
    }
  // for user after the login
  getData() {
    var userLoginData = localStorage.getItem('myData')
    var loginAfterRefresh = JSON.parse(userLoginData);

    if (loginAfterRefresh) {
      
      this.loginData = loginAfterRefresh.user[0].firstname;
      this.loginservice.loginSaveData = this.loginservice.loginSaveData;
      this.loginservice.loginAllData = loginAfterRefresh.user[0];
      this.loginservice.islogin = true;
    } else {
      this.router.navigate(['/login']);
      this.condition = true;
      // this.snackBar("Please check Email and password", "alert-danger");
    }
  }

  goesToEditMemo(data) {
    this.profileService.userDetail = data;
    this.profileService.userDetailUserId = data;
    this.router.navigate(['/edit-memorial']);

  }
  goesToEditMemo1(data1) {
    // this.profileService.userDetailUserId = data1;
    this.service.userGrabIdData = data1;

      const jsonData = JSON.stringify(data1)
      localStorage.setItem('myData1', jsonData)
  }



  poi:any;
  getUserMemorial() {
    var data = { "user_id": this.loginservice.loginAllData?.id }
    this.profileService.userCreatedMemorial(data)
      .subscribe(userRes => {
        let tempArray:any[] = userRes["User Memorials"];
        tempArray = tempArray.sort((a,b)=>
           a.grab_id - b.grab_id
        )
        this.getUserMemoData = tempArray.reverse();

        // let firstElement = tempArray.splice(0,1);
        // let newArray = tempArray.slice(0,tempArray.length);
        // newArray.push(firstElement[0]);
        // this.getUserMemoData = newArray;




        // this.getUserMemoData = userRes["User Memorials"];
        

        // this.getUserMemoData = this.getUserMemoData.reverse();
        this.service.userGrabIdData=userRes["User Memorials"][0].grab_id;
        for(let item of this.getUserMemoData){
          item.path= item.path +'?v='+this.service.index++;
        }
        if (this.caroucelCount == 1) {
          this.getUserMemoDataUser = this.getUserMemoData.slice(0, 3);
          // this.getUserMemoDataUser.map(function(item){return item.path});
        }

        // this.profileService.userDetail=userRes["User Memorials"].grab_id;
      })
  }

  getrecentMemorials() {
    this.service.getRecentmemorials()
      .subscribe(
        (recentMemorial: any) => {
          if (recentMemorial) {
            this.Memorials = recentMemorial.Memorials;
            for(let item of this.Memorials){
              item.path= item.path+'?v='+this.service.indexNew++;
            }
          }
        },
        error => {
          if (error) {
            console.log(error);
          }

        })
  }




  nextCarousel() {
    
    this.caroucelCount++;

    if (this.caroucelCount == 2) {
      this.getUserMemoDataUser = this.getUserMemoData.slice(3, 6);

    }
    if (this.caroucelCount == 3) {
      this.getUserMemoDataUser = this.getUserMemoData.slice(6, 9);
    }
    if (this.caroucelCount == 4) {
      this.getUserMemoDataUser = this.getUserMemoData.slice(9, 12);
    }
    if (this.caroucelCount == 5) {
      this.getUserMemoDataUser = this.getUserMemoData.slice(12, 15);
    }
    if (this.caroucelCount == null) {
      this.getUserMemoDataUser = this.getUserMemoData.slice(15, 18);
    }

  }

  prevCarousel() {
    
    this.caroucelCount = this.caroucelCount - 1;

    if (this.caroucelCount == 2) {
      this.getUserMemoDataUser = this.getUserMemoData.slice(3, 6);
    }
    if (this.caroucelCount == 3) {
      this.getUserMemoDataUser = this.getUserMemoData.slice(6, 9);
    }
    if (this.caroucelCount == 4) {
      this.getUserMemoDataUser = this.getUserMemoData.slice(9, 12);
    }
    if (this.caroucelCount == 5) {
      this.getUserMemoDataUser = this.getUserMemoData.slice(12, 15);
    }
    if (this.caroucelCount == 1 || null) {
      this.getUserMemoDataUser = this.getUserMemoData.slice(0, 3);
    }

  }






  openDiv(num) {
    if (num == 0) {
      this.showDiv = 0.1;
      this.isShow = true;
    }
  }
  openDiv1() {
    this.isShow = false;
  }




  // Code for labels
  openDialogue(num): void {

    if (num == 1) {
      this.showNewDiv1 = 1;
      this.isvalid1 = true;
    } else if (num == 2) {
      this.showNewDiv1 = 2;
      this.isvalid1 = true;
    }else if (num == 3) {
      this.showNewDiv1 = 3;
      this.isvalid1 = true;
    }else if (num == 4) {
      this.showNewDiv1 = 4;
      this.isvalid1 = true;
    }else if (num == 5) {
      this.showNewDiv1 = 5;
      this.isvalid1 = true;
    }else if (num == 6) {
      this.showNewDiv1 = 6;
      this.isvalid1 = true;
    }else if (num == 7) {
      this.showNewDiv1 = 7;
      this.isvalid1 = true;
    }else if (num == 8) {
      this.showNewDiv1 = 8;
      this.isvalid1 = true;
    }else if (num == 9) {
      this.showNewDiv1 = 9;
      this.isvalid1 = true;
    }else if (num == 10) {
      this.showNewDiv1 = 10;
      this.isvalid1 = true;
    }else if (num == 11) {
      this.showNewDiv1 = 11;
      this.isvalid1 = true;
    }else if (num == 12) {
      this.showNewDiv1 = 12;
      this.isvalid1 = true;
    }else if (num == 13) {
      this.showNewDiv1 = 13;
      this.isvalid1 = true;
    }else if (num == 14) {
      this.showNewDiv1 = 14;
      this.isvalid1 = true;
    }else if (num == 15) {
      this.showNewDiv1 = 15;
      this.isvalid1 = true;
    }else if (num == 16) {
      this.showNewDiv1 = 16;
      this.isvalid1 = true;
    }else if (num == 17) {
      this.showNewDiv1 = 17;
      this.isvalid1 = true;
    }else if (num == 18) {
      this.showNewDiv1 = 18;
      this.isvalid1 = true;
    }else if (num == 19) {
      this.showNewDiv1 = 19;
      this.isvalid1 = true;
    }else if (num == 20) {
      this.showNewDiv1 = 20;
      this.isvalid1 = true;
    }else if (num == 21) {
      this.showNewDiv1 = 21;
      this.isvalid1 = true;
    }else if (num == 22) {
      this.showNewDiv1 = 22;
      this.isvalid1 = true;
    }else if (num == 23) {
      this.showNewDiv1 = 23;
      this.isvalid1 = true;
    }else if (num == 24) {
      this.showNewDiv1 = 24;
      this.isvalid1 = true;
    }else if (num == 25) {
      this.showNewDiv1 = 25;
      this.isvalid1 = true;
    }else if (num == 26) {
      this.showNewDiv1 = 26;
      this.isvalid1 = true;
    }else if (num == 27) {
      this.showNewDiv1 = 27;
      this.isvalid1 = true;
    }else if (num == 28) {
      this.showNewDiv1 = 28;
      this.isvalid1 = true;
    }else if (num == 29) {
      this.showNewDiv1 = 29;
      this.isvalid1 = true;
    }else if (num == 30) {
      this.showNewDiv1 = 30;
      this.isvalid1 = true;
    }
    
  }


  openDialogue1() {
    this.isvalid1 = false;
  }


  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      console.log(res);
      this.respo = res.Details;
      // this.respo1 = this.respo[195];
      this.respo2 = this.respo[196];
      this.respo3 = this.respo[230];
      this.respo4 = this.respo[198];
      this.respo5 = this.respo[199];
      this.respo6 = this.respo[200];
      this.respo7 = this.respo[201];
      this.respo8 = this.respo[202];
      this.respo9 = this.respo[203];
      this.respo10 = this.respo[204];
      this.respo11 = this.respo[205];
      this.respo12 = this.respo[206];
      this.respo13 = this.respo[213];
      this.respo14 = this.respo[214];
      this.respo15 = this.respo[215];
      this.respo16 = this.respo[216];
      this.respo17 = this.respo[217];
      this.respo18 = this.respo[218];
      this.respo19 = this.respo[219];
      this.respo20 = this.respo[220];
      this.respo21 = this.respo[221];
      this.respo22 = this.respo[222];
      this.respo23 = this.respo[223];
      this.respo24 = this.respo[224];
      this.respo25 = this.respo[225];
      this.respo26 = this.respo[226];
      this.respo27 = this.respo[227];
      this.respo28 = this.respo[228];
      this.respo29 = this.respo[229];
      this.respo30 = this.respo[17];

      // 231
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



  clickShowStepBtn1() {
    
    if (1) {
      // btn class
      var test = document.getElementById("btn1");
      if (test != null) {
        test.style.backgroundColor = '#CF6363';
        test.style.color = 'white';
        
      }

      // btn class
      var test = document.getElementById("btn2");
      if (test != null) {
        test.style.backgroundColor = '';
        test.style.color = '#5D5959';
      }

      var test = document.getElementById("btn3");
      if (test != null) {
        test.style.backgroundColor = '';
        test.style.color = '#5D5959';
      }

      var test = document.getElementById("btn4");
      if (test != null) {
        test.style.backgroundColor = '';
        test.style.color = '#5D5959';
      }
    }
  }
  clickShowStepBtn2() {
    
    if (1) {
      // btn class
      var test = document.getElementById("btn1");
      if (test != null) {
        test.style.backgroundColor = '';
        test.style.color = '#5D5959'; 
      }

      // btn class
      var test = document.getElementById("btn2");
      if (test != null) {
        test.style.backgroundColor = '#CF6363';
        test.style.color = 'white';
      }

      var test = document.getElementById("btn3");
      if (test != null) {
        test.style.backgroundColor = '';
        test.style.color = '#5D5959';
      }

      var test = document.getElementById("btn4");
      if (test != null) {
        test.style.backgroundColor = '';
        test.style.color = '#5D5959';
      }
    }
  }
  
  clickShowStepBtn3() {
    
    if (1) {
      // btn class
      var test = document.getElementById("btn1");
      if (test != null) {
        test.style.backgroundColor = '';
        test.style.color = '#5D5959';
      }

      // btn class
      var test = document.getElementById("btn2");
      if (test != null) {
        test.style.backgroundColor = '';
        test.style.color = '#5D5959';
      }

      var test = document.getElementById("btn3");
      if (test != null) {
        test.style.backgroundColor = '#CF6363';
        test.style.color = 'white';
      }

      var test = document.getElementById("btn4");
      if (test != null) {
        test.style.backgroundColor = '';
        test.style.color = '#5D5959';
      }
    }
  }

  clickShowStepBtn4() {
    
    if (1) {
      // btn class
      var test = document.getElementById("btn1");
      if (test != null) {
        test.style.backgroundColor = '';
        test.style.color = '#5D5959';
      }

      // btn class
      var test = document.getElementById("btn2");
      if (test != null) {
        test.style.backgroundColor = '';
        test.style.color = '#5D5959';
      }

      var test = document.getElementById("btn3");
      if (test != null) {
        test.style.backgroundColor = '';
        test.style.color = '#5D5959';
      }

      var test = document.getElementById("btn4");
      if (test != null) {
        test.style.backgroundColor = '#CF6363';
        test.style.color = 'white';
      }
    }
  }

  openUserSearchPopup(){
    const dialogRef = this.dialog.open(UserSearchPopupComponent,{
      width:'500px',
      height:'500px'
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
