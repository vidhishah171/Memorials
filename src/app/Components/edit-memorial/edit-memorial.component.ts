import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { CreateMemorialService } from 'src/services/create-memorial.service';
import { EditMemorialService } from 'src/services/edit-memorial.service';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';

@Component({
  selector: 'app-edit-memorial',
  templateUrl: './edit-memorial.component.html',
  styleUrls: ['./edit-memorial.component.css']
})
export class EditMemorialComponent implements OnInit {

  Memorials:any;// Recent Memorial Variable

  canvas: fabric.Canvas;



  constructor(
    public service : RecentMeorialsService,
    public createService: CreateMemorialService,
    public loginService: LoginService,
    public editMemorial:EditMemorialService
  ) { }

  ngOnInit(): void {
    this.getrecentMemorials();
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
