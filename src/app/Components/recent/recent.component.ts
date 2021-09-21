import { Component, OnInit } from '@angular/core';
import { RecentMeorialsService } from '../../../services/recent-meorials.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit  {

  Memorials:any;// Recent Memorial Variable
  PremiumMemorials:any;

  constructor(
    private service : RecentMeorialsService
  ) { }


  ngOnInit(): void {
    this.getrecentMemorials();
    this.getPremiumMemorial();
    
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

      }
      )
  }


  getPremiumMemorial(){
    this.service.getPremiumMemorials()
    .subscribe(
      (premiumMemorials:any)=>{
       if (premiumMemorials) {
         this.PremiumMemorials = premiumMemorials.Memorials;
       }
      },
      error=>{
        console.log(error);
        
      }
    )
  }

}
