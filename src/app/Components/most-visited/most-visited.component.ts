import { Component, OnInit } from '@angular/core';
import { MostVisitedService } from '../../../services/most-visited.service';


@Component({
  selector: 'app-most-visited',
  templateUrl: './most-visited.component.html',
  styleUrls: ['./most-visited.component.css']
})
export class MostVisitedComponent implements OnInit {

  mostVisitMemorial:any;

  constructor(
    private service : MostVisitedService
  ) { }

  ngOnInit(): void {
    this.getData();

  }

  getData(){
    this.service.getMostVisMemorial().subscribe(
      (memorials:any)=>{
        
        this.mostVisitMemorial = memorials.Memorials;
        
      },
      errors=>{
        console.log(errors);
        
      }
    )}

}
