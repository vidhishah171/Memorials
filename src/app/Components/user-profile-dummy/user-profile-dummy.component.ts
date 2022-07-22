// import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { formatDate } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';
import { UserProfileService } from 'src/services/user-profile.service';
// import { UserProfilePopComponent } from './user-profile-pop/user-profile-pop.component';
import { NgxSpinnerService } from "ngx-spinner";
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { UserSearchPopupComponent } from '../user-account/user-search-popup/user-search-popup.component';

@Component({
  selector: 'app-user-profile-dummy',
  templateUrl: './user-profile-dummy.component.html',
  styleUrls: ['./user-profile-dummy.component.css']
})
export class UserProfileDummyComponent implements OnInit {

  isvalid: boolean;
  showNewDiv: number;
  url: any;
  showDiv: number;
  isShow: boolean;

  // lat = 51.678418;
  // lng = 7.809007;

  lat = -33.8688;
  lng = 151.2195;

  latitude: any;
  longitude: any;
  zoom: any;
  address: any;
  public geoCoder: any;
  userHometown: any = this.loginservice.loginAllData?.hometown;

  caroucelCount: number = 1;


  @ViewChild('pac-input')
  public searchElementRef: ElementRef;
  place: any;
  getUserMemoData: any;
  isDisplay: boolean;
  isDisplay1: boolean;
  userDate: any;
  isDisplay3: boolean;
  isDisplay4: boolean;

  maxDate = new Date();
  loginData: any;
  condition: boolean;
  showNewDiv1: number;
  isvalid1: boolean;
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
  respo11: any;
  respo12: any;
  respo10: any;
  respo13: any;
  respo14: any;
  respo15: any;
  respo16: any;
  respo17: any;
  respo18: any;
  userpic: any;
  birthdate: any;
  comment: any;
  firstname: any;
  hometown: any;
  lastname: any;
  imagesForCaroucelUser: any;
  birthdate1: string;
  respo19: any;
  respo20: any;
  respo21: any;


  constructor(
    public loginservice: LoginService,
    public dialog: MatDialog,
    public profileService: UserProfileService,
    public editservice: AdminEditService,
    private spiner: NgxSpinnerService,
    public service: RecentMeorialsService,

    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    public snack: MatSnackBar,
  ) {
    this.loginservice.otherPage = false; 
    this.loginservice.goPremiumLabel = true;
    this.loginservice.hideMemorialImage = true;
    this.loginservice.isFooterLogin = true;
   }

   ngAfterViewInit() {
    setTimeout(() => {
      this.codeAddress();
      this.initialize();
    }, 1000);

    this.initialize();
    setTimeout(() => {
      this.clickDiv();
    }, 1000);
  }
  
  

  ngOnInit(): void {
    this.loginservice.mapDataNew = "";
     // this.initAutocomplete();
     this.getUserData();
     this.myProfileData();
     this.initialize();
     this.getData();
     this.getUserMemorial();
     this.editData();
     this.userProfileDate();
     // this.userProfile();
  }


  getUserData(){
    debugger
    var userLoginData = localStorage.getItem('userDataDetail')
    var userDataDetails = JSON.parse(userLoginData);
    this.profileService.userDetailId = userDataDetails;
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
      this.loginservice.loginSaveData = this.loginData;
      this.loginservice.loginAllData = loginAfterRefresh.user[0];
      this.loginservice.islogin = true;
    } else {
      this.router.navigate(['/login']);
      this.condition = true;
      // this.snackBar("Please check Email and password", "alert-danger");
    }
  }
 

  // New code for map
  initialize() {
    const geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // codeAddress() {
    
    this.address = (<HTMLInputElement>document.getElementById('address')).value;
    geocoder.geocode({ 'address': this.address }, function (results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
    // }
  }
  codeAddress() {
    this.address = (<HTMLInputElement>document.getElementById('address')).value;
    this.initialize();
  }


  getUserMemorial() {
    
    var data = { "user_id": this.profileService.userDetailId}
    this.profileService.userCreatedMemorial(data)
      .subscribe(userRes => {
        console.log(userRes);

        let tempArray:any[] = userRes["User Memorials"];
        tempArray = tempArray.sort((a,b)=>
           a.grab_id - b.grab_id
        )
        this.getUserMemoData = tempArray.reverse();


        // this.getUserMemoData = userRes["User Memorials"];
        for(let item of this.getUserMemoData){
          item.path= item.path +'?v='+this.service.index++;
        }
        if (this.caroucelCount == 1) {
          this.imagesForCaroucelUser = this.getUserMemoData.slice(0, 5);
        }
        // this.profileService.userDetail=userRes["User Memorials"].grab_id;
      })

  }


  nextCarousel() {
    this.caroucelCount++;

    if (this.caroucelCount == 2) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(5, 10);

    }
    if (this.caroucelCount == 3) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(10, 15);
    }
    if (this.caroucelCount == 4) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(15, 20);
    }
    if (this.caroucelCount == 5) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(20, 25);
    }
    if (this.caroucelCount == null) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(25, 30);
    }

  }

  prevCarousel() {
    
    this.caroucelCount = this.caroucelCount - 1;

    if (this.caroucelCount == 2) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(5, 10);
    }
    if (this.caroucelCount == 3) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(10, 15);
    }
    if (this.caroucelCount == 4) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(15, 20);
    }
    if (this.caroucelCount == 5) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(20, 25);
    }
    if (this.caroucelCount == 1 || null) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(0, 5);
    }

  }






  goesToEditMemo(data) {
    
    this.profileService.userDetail = data;
    this.profileService.userDetailUserId = data;
    this.router.navigate(['/edit-memorial']);
  }
  goesToEditMemo1(data1) {
    
    // this.profileService.userDetailUserId = data1;
    this.service.userGrabIdData = data1
    
    const jsonData = JSON.stringify(data1)
      localStorage.setItem('myData1', jsonData)
  }










  openUser(num): void {

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
    }
  }

  openUser1() {
    this.isvalid = false;
    this.myProfileData();
  }
  userData1(data) {
    
    this.spiner.show();
    var userDateData = { id: data.form.value.id, birthdate: formatDate(data.form.value.birthdate, 'yyyy-MM-dd h:mm:ss', 'en_US') };
    var userDateData1 = { id: data.form.value.id, birthdate: formatDate(data.form.value.birthdate,'dd.MM.yyyy', 'en_US') };
    this.userDate = userDateData1.birthdate;
    this.isDisplay3 = false;
    this.isDisplay4 = true;
    // this.userDateData[1]=data.form.value.id;
    this.profileService.userProfile(userDateData).subscribe(responce => {
      console.log(responce);
      this.spiner.hide();
    })
  }

  userProfileDate() {
    
    if (this.birthdate !== '') {
      this.isDisplay3 = true;
      this.isDisplay4 = false;
    }
  }
  firstnameDisplay:boolean=false;

  userDataName(data) {
    
    this.firstnameDisplay=true;

    this.spiner.show();
    this.loginservice.loginSaveData = data.form.value.firstname;
    this.profileService.userProfile(data.form.value).subscribe((responce:any) => {
      this.spiner.hide();
      console.log(responce);
      this.firstnameDisplay=false;
    })
  }


  userData(data) {
    
    // this.loginservice.mapData = data.value.hometown;
    this.spiner.show();
    this.profileService.userProfile(data.form.value).subscribe((responce:any) => {
      this.spiner.hide();
      console.log(responce);
    })
  }
  snackBar(message: string, panelClass: string) {
    this.snack.openFromComponent(SnackbarComponent, {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: message,
      panelClass: panelClass,


    })

  };


  onselectFile(e) {
    // this.service.selectedMainImg = "";
    // this.changeStyle = null;
    
    // && e.target.files[0].size > 5242880
    if (e.target.files[0].size < 1000 || e.target.files[0].size > 5242880) {
      this.snackBar("Please check your image size (Size should be 1KB to 5MB)", "alert-danger");
    }
    else if((!this.ValidateFile(e.target.files[0].name))){
      this.snackBar("Please Upload jpeg, jpg, png file format.", "alert-danger");
    }
    // else if(e.target.files[0].size > 5242880){
    // this.snackBar("Please check your image size (Size should be 20KB to 5MB)", "alert-danger");
    // }
    else {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.isDisplay = false;
        this.isDisplay1 = true;
        this.userData2();
        // var userData={id:this.loginservice.loginAllData.id,userpic:this.url}
        // this.profileService.userProfile(userData).subscribe(responce=>{
        // console.log(responce);
        // })
      }
    }
  }
  ValidateFile(name:string){
    var ext=name.substring(name.lastIndexOf('.')+1);
    if(ext.toLowerCase()=='png' || ext.toLowerCase()=='jpeg' || ext.toLowerCase()=='jpg'){
      return true;
    }
    else
    return false;
  }

  // userProfile() {
  //   
  //   if (this.userpic) {
  //     this.isDisplay1 = false;
  //     this.isDisplay = true;
  //   }
  // }
  returnValue(value){
    
   return (value.charCode>64 && value.charCode<91) || (value.charCode > 96 && value.charCode < 123);

  }
  returnValue1(value){
    
    return (value.charCode>64 && value.charCode<91) || (value.charCode > 96 && value.charCode < 123) || (value.charCode == 32);
  }
  returnValue2(value){
    
    // return (value.charCode>64 && value.charCode<91) || (value.charCode > 96 && value.charCode < 123) || (value.charCode > 47 && value.charCode < 58) || (value.charCode == 32);
    return (value.charCode > 32 && value.charCode < 127) || (value.charCode == 32);
  }

  userData2() {
    
    this.spiner.show();
    var userData = { id: this.loginservice.loginAllData.id, userpic: this.url }

    this.profileService.userProfile(userData).subscribe((responce: any) => {
      this.spiner.hide();
      console.log(responce);

    })
  }

  geoMap() {
    
    setTimeout(() => {
      this.codeAddress();
      this.initialize();
    }, 1000);

    this.initialize();
  }





  // dialogOpen() {
  //   const dialogRef = this.dialog.open(UserProfilePopComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

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
    } else if (num == 3) {
      this.showNewDiv1 = 3;
      this.isvalid1 = true;
    } else if (num == 4) {
      this.showNewDiv1 = 4;
      this.isvalid1 = true;
    } else if (num == 5) {
      this.showNewDiv1 = 5;
      this.isvalid1 = true;
    } else if (num == 6) {
      this.showNewDiv1 = 6;
      this.isvalid1 = true;
    } else if (num == 7) {
      this.showNewDiv1 = 7;
      this.isvalid1 = true;
    } else if (num == 8) {
      this.showNewDiv1 = 8;
      this.isvalid1 = true;
    } else if (num == 9) {
      this.showNewDiv1 = 9;
      this.isvalid1 = true;
    } else if (num == 10) {
      this.showNewDiv1 = 10;
      this.isvalid1 = true;
    } else if (num == 11) {
      this.showNewDiv1 = 11;
      this.isvalid1 = true;
    } else if (num == 12) {
      this.showNewDiv1 = 12;
      this.isvalid1 = true;
    } else if (num == 13) {
      this.showNewDiv1 = 13;
      this.isvalid1 = true;
    } else if (num == 14) {
      this.showNewDiv1 = 14;
      this.isvalid1 = true;
    } else if (num == 15) {
      this.showNewDiv1 = 15;
      this.isvalid1 = true;
    } else if (num == 16) {
      this.showNewDiv1 = 16;
      this.isvalid1 = true;
    } else if (num == 17) {
      this.showNewDiv1 = 17;
      this.isvalid1 = true;
    } else if (num == 18) {
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
    }
  }


  openDialogue1() {
    this.isvalid1 = false;
  }


  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      console.log(res);
      this.respo = res.Details;
      this.respo1 = this.respo[195];
      this.respo2 = this.respo[196];
      this.respo3 = this.respo[197];
      this.respo4 = this.respo[198];
      this.respo5 = this.respo[199];
      this.respo6 = this.respo[200];
      this.respo7 = this.respo[201];
      this.respo8 = this.respo[202];
      this.respo9 = this.respo[203];
      this.respo10 = this.respo[204];
      this.respo11 = this.respo[205];
      this.respo12 = this.respo[206];
      this.respo13 = this.respo[207];
      this.respo14 = this.respo[208];
      this.respo15 = this.respo[209];
      this.respo16 = this.respo[210];
      this.respo17 = this.respo[211];
      this.respo18 = this.respo[212];
      this.respo19 = this.respo[252];
      this.respo20 = this.respo[251];
      this.respo21 = this.respo[253];

      //213
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


  myProfileData() {
    debugger
    // this.spiner.show();
    var ProfileId = { "user_id": this.profileService.userDetailId }
    this.profileService.userProfileDetails(ProfileId).subscribe((data: any) => {
      debugger
      console.log(data);
      this.userpic = data.Data[0].userpic;
      this.birthdate = data.Data[0].birthdate;
      this.birthdate1 = formatDate(this.birthdate,'dd.MM.yyyy', 'en_US');
      this.comment = data.Data[0].comment;
      this.firstname = data.Data[0].firstname;
      // this.loginservice.loginSaveData = this.firstname;
      this.hometown = data.Data[0].hometown;
      this.loginservice.mapDataNew = this.hometown;
      this.geoMap();
      this.lastname = data.Data[0].lastname;
      // this.spiner.hide();
      if (this.userpic !== '') {
        this.isDisplay1 = false;
        this.isDisplay = true;
      }
    })
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
