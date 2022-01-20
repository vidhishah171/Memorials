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

  Memorials:any;// Recent Memorial Variable

  canvas: fabric.Canvas;
  lovedPersonData: any;



  constructor(
    public service : RecentMeorialsService,
    public createService: CreateMemorialService,
    public loginService: LoginService,
    public editMemorial:EditMemorialService,
    public profileService: UserProfileService,
    public editCanvas:EditMemorialService,


  ) { }

  ngOnInit(): void {
    debugger
    this.getrecentMemorials();
    this.postGrabId();
  }

  postGrabId(){
    debugger
    var jsonData=this.profileService.userDetail
  
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
