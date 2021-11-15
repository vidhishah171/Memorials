import { Component, OnInit } from '@angular/core';
import { AdminEditService } from 'src/services/admin-edit.service';

@Component({
  selector: 'app-admin-edit-example',
  templateUrl: './admin-edit-example.component.html',
  styleUrls: ['./admin-edit-example.component.css']
})
export class AdminEditExampleComponent implements OnInit {
  respo: any;
  respo1: any;
  respo2: any;

  constructor( public editservice:AdminEditService) { }

  ngOnInit(): void {
    this.editData();
  }


  editData(){
    debugger;
    this.editservice.adminEdit().subscribe((res:any)=>{
      console.log(res);
      this.respo=res.Details;
      this.respo1=this.respo[29];
      this.respo2=this.respo[41];
    });
  }
}
