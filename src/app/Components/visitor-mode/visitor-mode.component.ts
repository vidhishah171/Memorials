import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(
    public profileService: UserProfileService,
    public editCanvas: EditMemorialService,
    public service: RecentMeorialsService,
    public loginservice: LoginService,
    private router: Router,


  ) { this.loginservice.otherPage = false; }

  ngOnInit(): void {
    this.getrecentMemorials();
    this.postGrabId();
    this.getData();
    this.getPhotoVideo();
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
      // this.router.navigate(['/login']);
      this.condition = true;
      // this.snackBar("Please check Email and password", "alert-danger");
    }
  }


  setData() {
    debugger
    const jsonData = JSON.stringify(this.service.userUserIdData,this.service.userGrabIdData2)
    sessionStorage.setItem('myData', jsonData)
  }




  // for user details
  getUserMemorial() {
    debugger;
    var data = { "user_id": this.loginservice.loginAllData?.id }
    this.profileService.userCreatedMemorial(data)
      .subscribe(userRes => {
        console.log(userRes);
        this.getUserMemoData = userRes["User Memorials"];
        this.service.userGrabIdData = userRes["User Memorials"][0].grab_id;
        // this.profileService.userDetail=userRes["User Memorials"].grab_id;
      })

  }

  // For user data retrive
  postGrabId() {
    debugger
    var jsonData = this.service.userGrabIdData2

    var formdata = new FormData();
    formdata.append('grab_id', jsonData);

    this.editCanvas.fetchJson(formdata).subscribe((Response: any) => {
      console.log(Response);
      debugger
      this.lovedPersonData = Response.Details[0];
      this.lovedPersonData1 = Response.Details;
      // if(Response){
      //   debugger
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
    debugger;

    var photoFormData1 = new FormData();
    photoFormData1.append('user_id', this.service.userUserIdData);

    this.editCanvas.getPhotoVideo(photoFormData1).subscribe((userRes1: any) => {
      debugger;
      console.log(userRes1);
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


