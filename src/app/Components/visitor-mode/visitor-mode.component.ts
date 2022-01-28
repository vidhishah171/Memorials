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
  Memorials:any;// Recent Memorial Variable

  canvas: fabric.Canvas;
  getUserMemoData: any;
  loginData: any;
  condition: boolean;


  constructor(
    public profileService: UserProfileService,
    public editCanvas:EditMemorialService,
    public service : RecentMeorialsService,
    public loginservice: LoginService,
    private router: Router,


  ) { }

  ngOnInit(): void {
    this.getrecentMemorials();
    this.postGrabId();
    this.getData();
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





   // for user details
   getUserMemorial() {
    debugger;
    var data = { "user_id": this.loginservice.loginAllData?.id }
    this.profileService.userCreatedMemorial(data)
      .subscribe(userRes => {
        console.log(userRes);
        this.getUserMemoData = userRes["User Memorials"];
        this.service.userGrabIdData=userRes["User Memorials"][0].grab_id;
        // this.profileService.userDetail=userRes["User Memorials"].grab_id;
      })

  }

  // For user data retrive
  postGrabId(){
    debugger
    var jsonData=this.service.userGrabIdData
  
    var formdata=new FormData();
    formdata.append('grab_id',jsonData);
  
    this.editCanvas.fetchJson(formdata).subscribe((Response:any)=>{
      console.log(Response);
      debugger
      this.lovedPersonData=Response.Details[0];
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

  getrecentMemorials(){
    this.service.getRecentmemorials()
    .subscribe(
      (recentMemorial :any ) =>{
       if (recentMemorial) {
          this.Memorials = recentMemorial.Memorials;
       }
      },
      error=>{
        if (error) {
          console.log(error);
        }

      })
  }
}


