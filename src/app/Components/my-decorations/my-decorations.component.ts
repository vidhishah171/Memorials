import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { UserProfileService } from 'src/services/user-profile.service';

@Component({
  selector: 'app-my-decorations',
  templateUrl: './my-decorations.component.html',
  styleUrls: ['./my-decorations.component.css']
})
export class MyDecorationsComponent implements OnInit {

  uploadBack: any;
  updateBack: any;
  uploadData: { image_type_id: string; image_data: any; user_id: any; };
  updateData: { item_id: any; image_data: any; };
  getPhotoVideoImageId: any;
  getPhotoVideoImage1: any;
  getPhotoVideoImage2: any;
  getPhotoVideoImage3: any;
  getPhotoVideoImage4: any;
  getPhotoVideoImage5: any;
  getPhotoVideoImage7: any;
  getPhotoVideoImage6: any;
  getPhotoVideoImage8: any;
  getPhotoVideoImage9: any;
  getPhotoVideoImage11: any;
  getPhotoVideoImage10: any;
  getPhotoVideoImage12: any;
  loginData: any;


  constructor(
    public profileService: UserProfileService,
    public service: RecentMeorialsService,
    public loginservice: LoginService,
    private spiner: NgxSpinnerService,
    public snack: MatSnackBar,
  ) { }
  ngOnInit(): void {
    debugger
    this.getData();
    this.fetchBackgrounds();
  }

  getData() {
    var userLoginData = localStorage.getItem('myData')
    var loginAfterRefresh = JSON.parse(userLoginData);

    this.loginservice.loginAllData = loginAfterRefresh.user[0];
  }


  fetchBackgrounds(){
    debugger
    var fetchBack = {
      "user_id" : this.loginservice.loginAllData?.id,
      "image_type_id" : 2
    }
    this.profileService.fetchMyBackground(fetchBack).subscribe((responce: any) => {

      if(responce.status == "success"){
      this.getPhotoVideoImageId = responce.Data;

      this.getPhotoVideoImage1 = responce.Data[0]?.image;
      this.getPhotoVideoImage2 = responce.Data[1]?.image;
      this.getPhotoVideoImage3 = responce.Data[2]?.image;
      this.getPhotoVideoImage4 = responce.Data[3]?.image;
      this.getPhotoVideoImage5 = responce.Data[4]?.image;
      this.getPhotoVideoImage6 = responce.Data[5]?.image;
      this.getPhotoVideoImage7 = responce.Data[6]?.image;
      this.getPhotoVideoImage8 = responce.Data[7]?.image;
      this.getPhotoVideoImage9 = responce.Data[8]?.image;
      this.getPhotoVideoImage10 = responce.Data[9]?.image;
      this.getPhotoVideoImage11 = responce.Data[10]?.image;
      this.getPhotoVideoImage12 = responce.Data[11]?.image;
      }else{
        this.getPhotoVideoImage1 = "";
      }
    })
  }




  uploadBackgroundImage(data){
    debugger
    var reader = new FileReader();
    reader.readAsDataURL(data.target.files[0]);
    reader.onload = (event: any) => {
      this.uploadBack = event.target.result;
      if(this.uploadBack != ''){
        var userid = `${this.loginservice.loginAllData?.id}`
      this.uploadData={
        "image_type_id" : "2",
        "image_data" : this.uploadBack,
        "user_id" : userid
      }
      this.spiner.show();
      this.profileService.uploadMyBackground(this.uploadData).subscribe((responce: any) => {
        if(responce){
          this.fetchBackgrounds();
          this.spiner.hide();
          this.snackBar("Background image successfully uploaded", "alert-green");
        }
      })
    }
    }

  }

  updateBackgroundImage(dataNew,imageId){

    debugger
    var reader = new FileReader();
    reader.readAsDataURL(dataNew.target.files[0]);
    reader.onload = (event: any) => {
      this.updateBack = event.target.result;
      if(this.updateBack != ''){
      this.updateData = {
        "item_id" : imageId,
        "image_data" : this.updateBack
      }
    this.spiner.show();
      this.profileService.updateMyBackground(this.updateData).subscribe((resp: any) => {
        if(resp){
          this.fetchBackgrounds();
          this.spiner.hide();
          this.snackBar("Background image successfully updated", "alert-green");
        }
      })
    }
    }


  }

  deletePhoto(imageIdForDelete){
    debugger
    var deleteData = {
      "item_id" : imageIdForDelete
    }
    this.spiner.show();
    this.profileService.deleteMyBackground(deleteData).subscribe((respDelete: any) => {
      if(respDelete){
      this.fetchBackgrounds();
      this.spiner.hide();
      this.snackBar("Background image successfully deleted", "alert-danger");
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

}

