import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
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



  constructor(
    public service: RecentMeorialsService,
    public createService: CreateMemorialService,
    public loginService: LoginService,
    public editMemorial: EditMemorialService,
    public profileService: UserProfileService,
    public editCanvas: EditMemorialService,


  ) {
    // this.getUserMemorial();
    // var p=this.service.userGrabIdData;
    // var q=this.profileService.userDetailUserId;
  }

  ngOnInit(): void {
    debugger
    this.getData();
    // this.getUserMemorial();
    this.getrecentMemorials();
    this.postGrabId();
  }

  ngOnDestroy() {
    debugger
    window.location.reload();
  }

  getData() {
    debugger
    var userLoginData = sessionStorage.getItem('myData')
    var loginAfterRefresh = JSON.parse(userLoginData);

    this.loginService.loginAllData = loginAfterRefresh.user[0].id;
    this.getUserMemorial();
  }

  // Get user Memorials for refresh user
  getUserMemorial() {
    debugger;
    var data = { "user_id": this.loginService.loginAllData }
    this.profileService.userCreatedMemorial(data)
      .subscribe(userRes => {
        console.log(userRes);
        this.getUserMemoData = userRes["User Memorials"];
        this.service.userGrabIdData = userRes["User Memorials"][0].grab_id;

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
}
