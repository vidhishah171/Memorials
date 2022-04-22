import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { EditMemorialService } from 'src/services/edit-memorial.service';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { UserProfileService } from 'src/services/user-profile.service';

@Component({
  selector: 'app-visitor-mode',
  templateUrl: './visitor-mode.component.html',
  styleUrls: ['./visitor-mode.component.css']
})
export class VisitorModeComponent implements OnInit {

  lovedPersonData: any;
  Memorials: any;// Recent Memorial Variable

  canvas: fabric.Canvas;
  getUserMemoData: any;
  loginData: any;
  condition: boolean;
  showPhotoVideoDiv: number;
  getPhotoVideoImage1: any;
  getPhotoVideoImage2: any;
  getPhotoVideoImage3: any;
  getPhotoVideoImage4: any;
  getPhotoVideoImage5: any;
  getPhotoVideoImage6: any;
  getPhotoVideoImage7: any;
  getPhotoVideoImage8: any;
  getPhotoVideoImage9: any;
  getPhotoVideoImage10: any;
  getPhotoVideoImage11: any;
  getPhotoVideoImage12: any;
  lovedPersonData1: any;
  url: any;
  isDisplay: boolean;
  userpic: any;
  memorialDetails: any;
  memorialDetails1: any;


  constructor(
    public profileService: UserProfileService,
    public editCanvas: EditMemorialService,
    public service: RecentMeorialsService,
    public loginservice: LoginService,
    private router: Router,
    public snack: MatSnackBar,
    private spiner: NgxSpinnerService,




  ) { this.loginservice.otherPage = false;
    this.loginservice.isFooterLogin = true;
    this.loginservice.hideMemorialImage = false;
    
  }

  ngOnInit(): void {
    this.getrecentMemorials();
    this.getData1();
    this.getData();
    this.postGrabId();
    this.getPhotoVideo();
    this.myProfileData();
    this.getMeorialDetail();
  }
  getData1() {
    var userLoginDataNew = localStorage.getItem('myData1')
    var loginAfterRefreshNew = JSON.parse(userLoginDataNew);

    this.service.userGrabIdData2 = loginAfterRefreshNew;
    // this.getUserMemorial();
  }

  // for user after the login
  getData() {
    var userLoginData = localStorage.getItem('myData')
    var loginAfterRefresh = JSON.parse(userLoginData);

    if (loginAfterRefresh) {
      
      this.loginData = loginAfterRefresh.user[0].firstname;
      this.loginservice.loginSaveData = this.loginData;
      this.loginservice.loginAllData = loginAfterRefresh.user[0].id;
      this.loginservice.islogin = true;
    } else {
      // this.router.navigate(['/login']);
      this.condition = true;
      // this.snackBar("Please check Email and password", "alert-danger");
    }
  }


  // Get user profile image
  myProfileData() {
    // this.spiner.show();
    var ProfileId = { "user_id": this.service.userUserIdData }
    // this.loginservice.userId = this.loginservice.loginAllData?.id;
    this.profileService.myProfileDetails(ProfileId).subscribe((data: any) => {
      this.userpic = data.user_data[0].userpic;

    });
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





  // for user details
  getUserMemorial() {
    var data = { "user_id": this.loginservice.loginAllData}
    this.profileService.userCreatedMemorial(data)
      .subscribe(userRes => {
        this.getUserMemoData = userRes["User Memorials"];
        this.service.userGrabIdData2 = userRes["User Memorials"][0].grab_id;
        // this.profileService.userDetail=userRes["User Memorials"].grab_id;
      })

  }

  getMeorialDetail() {
    var data = { "grab_id": this.service.userGrabIdData2 }
    this.profileService.getMemorialDetails(data).subscribe((response: any) => {
      this.memorialDetails1 = response.Details[0].comments;
      this.memorialDetails = this.memorialDetails1.slice(0,8);
      for (let item of this.memorialDetails) {
        if (item.firstname != null) {
          item.firstname = item.firstname.replace(/[^a-zA-Z-.]/g, "");
        } else {
          item.firstname = '';
        } 
        if (item.lastname != null) {
          item.lastname = item.lastname.replace(/[^a-zA-Z-.]/g, "");
        }else{
          item.lastname = '';
        }
        if(item.created != null){
          item.created = formatDate(item.created, "M/d/yyyy 'at' h:mm aa", 'en_US');
        }else{
          item.created = '';
        }
      }

      // this.memorialDetails.map(function (item) { return item.fname = item.created.replace(/[^a-zA-Z-.]/g, "") });
      // this.service.createMemorial.DOB = formatDate(this.service.createMemorial.DOB, 'yyyy-M-d h:mm:ss', 'en_US');

    })
  }
  readAllCondo(){
    
    this.memorialDetails = this.memorialDetails1.slice();
  }

  condolencesComment(item:any){
    
   if(item.showFull)
   item.showFull=undefined;
   else
   item.showFull=true;
}


  // For user data retrive
  postGrabId() {
    var jsonData = this.service.userGrabIdData2

    var formdata = new FormData();
    formdata.append('grab_id', jsonData);

    this.editCanvas.fetchJson(formdata).subscribe((Response: any) => {
      
      this.lovedPersonData = Response.Details[0];
      this.lovedPersonData1 = Response.Details;
      // if(Response){
      //   
      //   var jsonData1=Response.Details[0].canvas_json;
      //   this.canvas.loadFromJSON(jsonData1, () => {

      //     // making sure to render canvas at the end
      //     this.canvas.renderAll();
      //   })
      // }
    })
  }

  getrecentMemorials() {
    this.service.getRecentmemorials()
      .subscribe(
        (recentMemorial: any) => {
          if (recentMemorial) {
            this.Memorials = recentMemorial.Memorials;
          }
        },
        error => {
          if (error) {
            console.log(error);
          }

        })
  }




  //  For Get Photo/Video gallery image
  getPhotoVideo() {

    var photoFormData1 = new FormData();
    photoFormData1.append('user_id', this.service.userUserIdData);

    this.editCanvas.getPhotoVideo(photoFormData1).subscribe((userRes1: any) => {
      this.getPhotoVideoImage1 = userRes1.Data[0].image;
      this.getPhotoVideoImage2 = userRes1.Data[1].image;
      this.getPhotoVideoImage3 = userRes1.Data[2].image;
      this.getPhotoVideoImage4 = userRes1.Data[3].image;
      this.getPhotoVideoImage5 = userRes1.Data[4].image;
      this.getPhotoVideoImage6 = userRes1.Data[5].image;
      this.getPhotoVideoImage7 = userRes1.Data[6].image;
      this.getPhotoVideoImage8 = userRes1.Data[7].image;
      this.getPhotoVideoImage9 = userRes1.Data[8].image;
      this.getPhotoVideoImage10 = userRes1.Data[9].image;
      this.getPhotoVideoImage11 = userRes1.Data[10].image;
      this.getPhotoVideoImage12 = userRes1.Data[11].image;

      // var photoData = userRes1
    })
  }


  photoVideoScroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  condolenceScroll(el: HTMLElement) {
    el.scrollIntoView();
  }


}


