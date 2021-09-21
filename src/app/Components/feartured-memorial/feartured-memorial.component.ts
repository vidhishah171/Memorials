import { Component, OnInit } from '@angular/core';
import { FearturedMemorialService } from '../../../services/feartured-memorial.service';

@Component({
  selector: 'app-feartured-memorial',
  templateUrl: './feartured-memorial.component.html',
  styleUrls: ['./feartured-memorial.component.css']
})
export class FearturedMemorialComponent implements OnInit {

  memorialData:any;

  constructor(
    private featureService : FearturedMemorialService
  ) { }

  ngOnInit(): void {
    this.getMemorials();
  }

  getMemorials(){
      this.featureService.getMemorials().subscribe(
      (memorial:any)=>{
       this.memorialData= memorial.Memorials;      
      },
      error=>{
        return error;
      }
    )
  }


}
