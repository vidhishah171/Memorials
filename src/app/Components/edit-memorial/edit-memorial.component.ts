import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Console } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscriber } from 'rxjs';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { CreateMemorialService } from 'src/services/create-memorial.service';
import { EditMemorialService } from 'src/services/edit-memorial.service';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { UserProfileService } from 'src/services/user-profile.service';
import { InvitePopupComponent } from '../visitor-mode/invite-popup/invite-popup.component';

@Component({
  selector: 'app-edit-memorial',
  templateUrl: './edit-memorial.component.html',
  styleUrls: ['./edit-memorial.component.css']
})
export class EditMemorialComponent implements OnInit {

  Memorials: any;// Recent Memorial Variable
  canvas: fabric.Canvas;
  lovedPersonData: any;
  getUserMemoData: any;
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
  buttonDisplay: boolean = true;
  lovedPersonData1: any;
  userpic: any;
  url: any;
  isDisplay: boolean;
  isDisplay1: boolean;
  memorialDetails1: any;
  memorialDetails: any;
  urlBackground: any;
  isDisplayBack1: boolean;
  isDisplayBack: boolean;
  userpicBack: any;
  getPhotoVideoImageId: any;
  pp: any;
  constructor(
    public service: RecentMeorialsService,
    public createService: CreateMemorialService,
    public loginService: LoginService,
    public editMemorial: EditMemorialService,
    public profileService: UserProfileService,
    public editCanvas: EditMemorialService,
    private spiner: NgxSpinnerService,
    public snack: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.loginService.otherPage = false;
    this.loginService.hideMemorialImage = false;
    this.loginService.isFooterLogin = true;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.clickDiv();
    }, 1000);
  }
  ngOnInit(): void {
    this.getData1()
    this.getData();
    this.myProfileData();
    this.getrecentMemorials();
    this.postGrabId();
    this.getPhotoVideo();
  }

  clickDiv() {
    var test = document.getElementById("navDiv");
    if (test != null) {
      test.style.position = 'absolute';
    }
  }
  // Get user profile image
  myProfileData() {
    var pic = document.getElementById('userHeading');
    pic.style.marginTop = '16%';
    var ProfileId = { "user_id": this.loginService.loginAllData }
    this.loginService.userId = this.loginService.loginAllData;
    this.spiner.show();
    this.profileService.myProfileDetails(ProfileId).subscribe((data: any) => {
      this.userpic = data.user_data[0].userpic;
      this.userpicBack = data.user_data[0].userbackground_image;
      if (this.userpic !== '') {
        this.isDisplay1 = false;
        this.isDisplay = true;
        this.spiner.hide();
      }
      if (this.userpicBack == '') {
        var pic = document.getElementById('userHeading');
        pic.style.marginTop = '16%';
        this.isDisplayBack1 = false;
        this.isDisplayBack = false;
        this.spiner.hide();
      }
      if (this.userpicBack !== '') {
        var pic = document.getElementById('userHeading');
        pic.style.marginTop = '0%';
        this.isDisplayBack1 = false;
        this.isDisplayBack = true;
        this.spiner.hide();
      }
    });
  }

  getMeorialDetail() {
    var data = { "grab_id": this.service.userGrabIdData2 }
    this.profileService.getMemorialDetails(data).subscribe((response: any) => {
      this.memorialDetails1 = response.Details[0].comments;
      this.memorialDetails = this.memorialDetails1.slice(0, 8);
      for (let item of this.memorialDetails) {
        if (item.firstname != null) {
          item.firstname = item.firstname.replace(/[^a-zA-Z-.]/g, "");
        } else {
          item.firstname = '';
        }
        if (item.lastname != null) {
          item.lastname = item.lastname.replace(/[^a-zA-Z-.]/g, "");
        } else {
          item.lastname = '';
        }
        if (item.created != null) {
          item.created = formatDate(item.created, "M/d/yyyy 'at' h:mm aa", 'en_US');
        } else {
          item.created = '';
        }
      }
    })
  }
  readAllCondo() {
    this.memorialDetails = this.memorialDetails1.slice();
  }

  condolencesComment(item: any) {
    if (item.showFull)
      item.showFull = undefined;
    else
      item.showFull = true;
  }
  getData() {
    var userLoginData = localStorage.getItem('myData')
    var loginAfterRefresh = JSON.parse(userLoginData);

    this.loginService.loginAllData = loginAfterRefresh.user[0].id;
    this.getUserMemorial();
  }

  getData1() {
    var userLoginDataNew = localStorage.getItem('myData1')
    var loginAfterRefreshNew = JSON.parse(userLoginDataNew);

    this.service.userGrabIdData = loginAfterRefreshNew;
  }
  // Get user Memorials for refresh user
  getUserMemorial() {
    this.spiner.show();
    var data = { "user_id": this.loginService.loginAllData }
    this.profileService.userCreatedMemorial(data)
      .subscribe(userRes => {
        this.getUserMemoData = userRes["User Memorials"];
        this.spiner.hide();
        this.getrecentMemorials();
        this.postGrabId();
      })
  }

  postGrabId() {
    var jsonData = this.service.userGrabIdData
    var formdata = new FormData();
    formdata.append('grab_id', jsonData);
    this.editCanvas.fetchJson(formdata).subscribe((Response: any) => {
      this.lovedPersonData = Response.Details[0];
      this.lovedPersonData1 = Response.Details;
    })
  }

  getrecentMemorials() {
    this.service.getRecentmemorials()
      .subscribe(
        (recentMemorial: any) => {
          if (recentMemorial) {
            this.Memorials = recentMemorial.Memorials;
            for (let item of this.Memorials) {
              item.path = item.path + '?v=' + this.service.indexNew++;
            }
          }
        },
        error => {
          if (error) {
            console.log(error);
          }
        })
  }

  photoUrl: any;
  photoUrlNew: any;
  updatePhotoVideoDeta: any;
  onselectFileNew(data, data1) {
    var reader = new FileReader();
    reader.readAsDataURL(data.target.files[0]);
    reader.onload = (event: any) => {
      this.photoUrlNew = event.target.result;
      if (this.photoUrlNew != '') {
        this.updatePhotoVideoDeta = {
          "image_id": data1,
          "image_data": this.photoUrlNew
        }
        this.spiner.show();
        this.editMemorial.updatePhotoVideoGallery(this.updatePhotoVideoDeta).subscribe((Response: any) => {
          if (Response.status == "success") {
            this.getPhotoVideo();
            this.snackBar('Image successfully update...', 'alert-green');
            this.spiner.hide();
          }
        });
      }
    }
  }

  onselectFile(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
      this.photoUrl = event.target.result;
      if (this.photoUrl) {
        this.photoVideoGallery();
      }
    }
  }

  onselectFile1(e) {
    if (e.target.files[0].size < 1000 || e.target.files[0].size > 5242880) {
      this.snackBar("Please check your image size (Size should be 1KB to 5MB)", "alert-danger");
    }
    else if ((!this.ValidateFile(e.target.files[0].name))) {
      this.snackBar("Please Upload jpeg, jpg, png file format.", "alert-danger");
    }
    else {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.isDisplay = false;
        this.isDisplay1 = true;
        this.userData2();
      }
    }
  }
  ValidateFile(name: string) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'jpg') {
      return true;
    }
    else
      return false;
  }
  userData2() {
    this.spiner.show();
    var userData = { id: this.loginService?.userId, userpic: this.url }
    this.profileService.userProfile(userData).subscribe((responce: any) => {
      this.spiner.hide();
    })
  }
  onselectFileBackground(e) {
    if (e.target.files[0].size < 1000 || e.target.files[0].size > 5242880) {
      this.snackBar("Please check your image size (Size should be 1KB to 5MB)", "alert-danger");
    }
    else if ((!this.ValidateFile(e.target.files[0].name))) {
      this.snackBar("Please Upload jpeg, jpg, png file format.", "alert-danger");
    }
    else {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.urlBackground = event.target.result;
        this.isDisplayBack = false;
        this.isDisplayBack1 = true;
        this.userDataBack();

      }
    }
  }

  userDataBack() {
    this.spiner.show();
    var userData = { id: this.loginService?.userId, userbackground_image: this.urlBackground }
    this.profileService.userProfile(userData).subscribe((responce: any) => {
      this.spiner.hide();
    })
  }

  // For photo/gallery image 
  photoVideoGallery() {
    var photoFormData = new FormData();
    photoFormData.append('user_id', this.loginService.loginAllData);
    photoFormData.append('image', this.photoUrl);

    this.spiner.show();
    this.editMemorial.photoVideo(photoFormData)
      .subscribe((userRes: any) => {
        if (userRes.status == "success") {
          this.getPhotoVideo();
          this.spiner.hide();
          this.snackBar('Image successfully add...', 'alert-green');
        }
      });
  }
  //  For Get Photo/Video gallery image
  getPhotoVideo() {
    var photoFormData1 = new FormData();
    photoFormData1.append('user_id', this.loginService.loginAllData);
    this.spiner.show();
    this.editMemorial.getPhotoVideo(photoFormData1).subscribe((userRes1: any) => {
      if (userRes1.status == "success") {
        this.pp = userRes1.Data;
        this.getPhotoVideoImageId = userRes1.Data;

        this.getPhotoVideoImage1 = userRes1.Data[0]?.image;
        this.getPhotoVideoImage2 = userRes1.Data[1]?.image;
        this.getPhotoVideoImage3 = userRes1.Data[2]?.image;
        this.getPhotoVideoImage4 = userRes1.Data[3]?.image;
        this.getPhotoVideoImage5 = userRes1.Data[4]?.image;
        this.getPhotoVideoImage6 = userRes1.Data[5]?.image;
        this.getPhotoVideoImage7 = userRes1.Data[6]?.image;
        this.getPhotoVideoImage8 = userRes1.Data[7]?.image;
        this.getPhotoVideoImage9 = userRes1.Data[8]?.image;
        this.getPhotoVideoImage10 = userRes1.Data[9]?.image;
        this.getPhotoVideoImage11 = userRes1.Data[10]?.image;
        this.getPhotoVideoImage12 = userRes1.Data[11]?.image;
        this.spiner.hide();
      } else {
        this.getPhotoVideoImage1 = '';
      }
    })
  }

  deletePhotoVideo(dataId) {
    var deleteData = {
      "image_id": dataId
    }
    this.spiner.show();
    this.editMemorial.getPhotoVideoDelete(deleteData).subscribe((deleteRes: any) => {
      if (deleteRes) {
        this.getPhotoVideo();
        this.snackBar('Image successfully deleted...', 'alert-danger');
        this.spiner.hide();
      }
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

  vitaScroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  photoVideoScroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  condolenceScroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  openInvitePopup() {
    const dialogRef = this.dialog.open(InvitePopupComponent, {
      width: '500px',
      height: '500px'

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
