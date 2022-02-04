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
import { UserProfilePopComponent } from './user-profile-pop/user-profile-pop.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
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


  constructor(
    public loginservice: LoginService,
    public dialog: MatDialog,
    public profileService: UserProfileService,
    public editservice: AdminEditService,


    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    public snack: MatSnackBar,




  ) { }

  ngAfterViewInit() {
    debugger
    setTimeout(() => {
      this.codeAddress();
      this.initialize();
    }, 1000);

    this.initialize();
  }

  ngOnInit(): void {

    // this.initAutocomplete();
    this.getData();
    this.initialize();
    this.getUserMemorial();
    this.userProfile();
    this.userProfileDate();
    this.editData();
  }

  // for user after the login
  getData() {
    var userLoginData = sessionStorage.getItem('myData')
    var loginAfterRefresh = JSON.parse(userLoginData);

    if (loginAfterRefresh) {
      debugger
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
    debugger
    const geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // codeAddress() {
    debugger
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
    debugger;
    this.address = (<HTMLInputElement>document.getElementById('address')).value;
    this.initialize();
  }


  getUserMemorial() {
    debugger
    var data = { "user_id": this.loginservice.loginAllData.id }
    this.profileService.userCreatedMemorial(data)
      .subscribe(userRes => {
        console.log(userRes);
        this.getUserMemoData = userRes["User Memorials"];
        // this.profileService.userDetail=userRes["User Memorials"].grab_id;
      })

  }

  goesToEditMemo(data) {
    this.profileService.userDetail = data;
    this.router.navigate(['/edit-memorial']);
  }
  goesToEditMemo1(data1) {
    this.profileService.userDetailUserId = data1;
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
  }
  userData1(data) {
    debugger;
    var userDateData = { id: data.form.value.id, birthdate: formatDate(data.form.value.birthdate, 'yyyy-MM-dd h:mm:ss', 'en_US') };
    var userDateData1 = { id: data.form.value.id, birthdate: formatDate(data.form.value.birthdate, 'yyyy-MM-dd', 'en_US') };
    this.userDate = userDateData1.birthdate;
    this.isDisplay3 = false;
    this.isDisplay4 = true;
    // this.userDateData[1]=data.form.value.id;
    this.profileService.userProfile(userDateData).subscribe(responce => {
      console.log(responce);
    })
  }

  userProfileDate() {
    if (this.loginservice.loginAllData.birthdate) {
      this.isDisplay3 = true;
      this.isDisplay4 = false;
    }
  }

  userData(data) {
    debugger
    this.profileService.userProfile(data.form.value).subscribe(responce => {
      console.log(responce);
    })
  }
  snackBar(message: string, panelClass: string) {
    this.snack.openFromComponent(SnackbarComponent, {
      duration: 2500,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      data: message,
      panelClass: panelClass,


    })

  };


  onselectFile(e) {
    // this.service.selectedMainImg = "";
    // this.changeStyle = null;
    debugger

    if (e.target.files[0].size > 5242880) {
      this.snackBar("Please check your image size", "alert-danger");
    }else{
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

  userProfile() {
    if (this.loginservice.loginAllData.userpic) {
      this.isDisplay1 = false;
      this.isDisplay = true;
    }
  }

  userData2() {
    debugger;
    var userData = { id: this.loginservice.loginAllData.id, userpic: this.url }

    this.profileService.userProfile(userData).subscribe(responce => {
      console.log(responce);
    })
  }

  geoMap() {
    debugger
    setTimeout(() => {
      this.codeAddress();
      this.initialize();
    }, 1000);

    this.initialize();
  }





  dialogOpen() {
    const dialogRef = this.dialog.open(UserProfilePopComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
  
}






