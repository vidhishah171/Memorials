import { MapsAPILoader } from '@agm/core';
import { formatDate } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  isDisplay1:boolean;
  userDate: any;
  isDisplay3: boolean;
  isDisplay4: boolean;

  maxDate = new Date();
  loginData: any;
  condition: boolean;


  constructor(
    public loginservice: LoginService,
    public dialog: MatDialog,
    public profileService: UserProfileService,

    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,



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
  }

  // for user after the login
  getData() {
    var userLoginData = localStorage.getItem('myData')
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
    this.isDisplay3=false;
    this.isDisplay4=true;
    // this.userDateData[1]=data.form.value.id;
    this.profileService.userProfile(userDateData).subscribe(responce => {
      console.log(responce);
    })
  }

  userProfileDate(){
    if(this.loginservice.loginAllData.birthdate){
      this.isDisplay3=true;
      this.isDisplay4=false;
    }
  }

  userData(data) {
    debugger
    this.profileService.userProfile(data.form.value).subscribe(responce => {
      console.log(responce);
    })
  }


  onselectFile(e) {
    // this.service.selectedMainImg = "";
    // this.changeStyle = null;
    debugger
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.isDisplay=false;
        this.isDisplay1=true;
        this.userData2();
      }
      // var userData={id:this.loginservice.loginAllData.id,userpic:this.url}
      // this.profileService.userProfile(userData).subscribe(responce=>{
      // console.log(responce);
      // })
    }
  }

  userProfile(){
    if(this.loginservice.loginAllData.userpic){
      this.isDisplay1=false;
      this.isDisplay=true;
    }
  }

  userData2() {
    debugger;
    var userData = { id: this.loginservice.loginAllData.id, userpic: this.url }

    this.profileService.userProfile(userData).subscribe(responce => {
      console.log(responce);
    })
  }

  geoMap(){
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


}




