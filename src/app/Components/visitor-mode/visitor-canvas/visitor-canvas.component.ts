import { Component, OnInit } from '@angular/core';
import { EditMemorialService } from 'src/services/edit-memorial.service';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { UserProfileService } from 'src/services/user-profile.service';
import { fabric } from 'fabric';
import { Router } from '@angular/router';



@Component({
  selector: 'app-visitor-canvas',
  templateUrl: './visitor-canvas.component.html',
  styleUrls: ['./visitor-canvas.component.css']
})
export class VisitorCanvasComponent implements OnInit {
  showNewDiv: number;
  isvalid: boolean;
  vitaData: any;
  canvas: fabric.Canvas;
  getUserMemoData: any;
  jsonData1: any;



  constructor(
    public profileService: UserProfileService,
    public editCanvas: EditMemorialService,
    public service : RecentMeorialsService,
    private router: Router,
    public loginService: LoginService,



  ) { }

  ngOnInit(): void {
    this.canvasadd();
    this.displayVitaText();
    this.postGrabId();
  }

  canvasadd() {
    this.canvas = new fabric.Canvas('Mycanvas');
  }

 

   // For display vita text
   displayVitaText() {
    
    var fetchData = { "grab_id": this.service.userGrabIdData2}
    this.editCanvas.fetchVita(fetchData).subscribe((response:any) => {
      console.log(response);
      if(response.details.vita_html !== "undefined"){
        this.vitaData = response.details.vita_html;
      }
    })
  }


  // for vita text input
  openUser(num): void {

    if (num == 100) {
      this.showNewDiv = 100;
      this.isvalid = true;
    }
  }
  openUser1() {
    this.isvalid = false;
  }


  postGrabId() {
    
    var jsonData = this.service.userGrabIdData2;
debugger
    var formdata = new FormData();
    formdata.append('grab_id', jsonData);

    this.editCanvas.fetchJson(formdata).subscribe((Response: any) => {
      console.log(Response);
      this.editCanvas.lovedPersonData = Response;
      if (Response) {
        
        var jsonData1 = Response.Details[0].canvas_json;
        // this.jsonData1 = Response.Details[0].path;
        
        this.canvas.loadFromJSON(jsonData1, () => {

          // making sure to render canvas at the end
          this.canvas.renderAll();

           // code for hide previous json
            this.canvas.getObjects().forEach(function (key) {
            key.lockMovementX = true;
            key.lockMovementY = true;
            key.lockRotation = true;
            key.hasBorders = false;
            key.hasControls = false;
          })
        })
      }
    })
  }


  goesToEditMemo() {
    
    this.profileService.userDetail = this.service.userGrabIdData1;
    this.router.navigate(['/edit-memorial']);
  }

 
  
}

