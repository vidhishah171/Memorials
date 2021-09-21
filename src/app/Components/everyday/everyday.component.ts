import { Component, OnInit } from '@angular/core';
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
    private evrydayMemService: EveryDayMeorialsService
  ) { }

  ngOnInit(): void {
    this.getMemorials();
  }

  getMemorials(){
    this.evrydayMemService.getEverydayMemorial()
    .subscribe(
      (evrydayMem:any)=>{
        this.allData = evrydayMem.Commemorate;
        this.boxOneData.push(this.allData.pop());      
        this.boxTwoData  = this.allData.splice(0,6);
        
      },
      error=>{
        console.log(error);
        
      }
    )
  }



}
