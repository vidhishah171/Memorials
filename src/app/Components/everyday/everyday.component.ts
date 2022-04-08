import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { EveryDayMeorialsService } from '../../../services/every-day-meorials.service';

@Component({
  selector: 'app-everyday',
  templateUrl: './everyday.component.html',
  styleUrls: ['./everyday.component.css']
})
export class EverydayComponent implements OnInit {

  boxOneData=[];
  boxTwoData:Array<6>;
  allData:any;

  constructor(
    private evrydayMemService: EveryDayMeorialsService,
    private recentService : RecentMeorialsService,
    private router: Router,
    private loginservice:LoginService
  ) {  }

  ngOnInit(): void {
    this.getMemorials();
  }

  getMemorials(){
    this.evrydayMemService.getEverydayMemorial()
    .subscribe(
      (evrydayMem:any)=>{
        this.allData = evrydayMem.Commemorate;

        this.allData.map(function (item) { return item.firstname = item.firstname.replace(/[^a-zA-Z-.]/g, "") });
        this.allData.map(function (item) { return item.lastname = item.lastname.replace(/[^a-zA-Z-.]/g, "") });

        this.boxOneData.push(this.allData.pop());      
        this.boxTwoData  = this.allData.splice(0,6);

       
      },
      error=>{
        console.log(error);
        
      }
    )
  }


  // For visitor-mode page
  recentMemorialGrabId(data,data1){
    console.log(data);

    if(data){
      this.recentService.userGrabIdData2=data;
      this.recentService.userUserIdData = data1;

      this.router.navigate(['/visitor-mode']);
    }
  }


}
