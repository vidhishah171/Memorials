import { Component, OnInit } from '@angular/core';
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



  constructor(
    public service: RecentMeorialsService,
    public createService: CreateMemorialService,
    public loginService: LoginService,
    public editMemorial: EditMemorialService,
    public profileService: UserProfileService,
    public editCanvas: EditMemorialService,
    private spiner : NgxSpinnerService,
    public snack: MatSnackBar,




  ) {this.loginService.otherPage = false;  }

  ngOnInit(): void {
    debugger
    this.getData();
    // this.getUserMemorial();
    this.getrecentMemorials();
    this.postGrabId();

    this.getPhotoVideo();
  }

  ngOnDestroy() {
    debugger
    window.location.reload();
  }

  getData() {
    debugger
    var userLoginData = localStorage.getItem('myData')
    var loginAfterRefresh = JSON.parse(userLoginData);

    this.loginService.loginAllData = loginAfterRefresh.user[0].id;
    this.getUserMemorial();
  }

  // Get user Memorials for refresh user
  getUserMemorial() {
    debugger;
    this.spiner.show();
    var data = { "user_id": this.loginService.loginAllData }
    this.profileService.userCreatedMemorial(data)
      .subscribe(userRes => {
        console.log(userRes);
        this.getUserMemoData = userRes["User Memorials"];
        this.spiner.hide();
        // this.service.userGrabIdData = userRes["User Memorials"][0].grab_id;
        // this.service.userGrabIdData1 = userRes["User Memorials"][0].grab_id;


        this.getrecentMemorials();
        this.postGrabId();
        // this.profileService.userDetail=userRes["User Memorials"].grab_id;
      })
  }

  postGrabId() {
    debugger
    var jsonData = this.service.userGrabIdData

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

  photoUrl: any;

  onselectFile(e) {
    debugger;
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
      this.photoUrl = event.target.result;
      if (this.photoUrl) {
        this.photoVideoGallery();
      }
    }
  }


  // For photo/gallery image 
  photoVideoGallery() {
    debugger;
    var photoFormData = new FormData();
    photoFormData.append('user_id', this.loginService.loginAllData);
    photoFormData.append('image', this.photoUrl);

    this.spiner.show();
    this.editMemorial.photoVideo(photoFormData)
      .subscribe((userRes:any) => {
        console.log(userRes);
        if(userRes.status == "success"){
          this.getPhotoVideo();
          this.spiner.hide();
          this.snackBar('Image successfully add...', 'alert-green');

        }
      });
  }


  //  For Get Photo/Video gallery image
  getPhotoVideo() {
    debugger;

    var photoFormData1 = new FormData();
    photoFormData1.append('user_id', this.loginService.loginAllData);

    this.editMemorial.getPhotoVideo(photoFormData1).subscribe((userRes1: any) => {
      debugger;
      console.log(userRes1);
      
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
}
