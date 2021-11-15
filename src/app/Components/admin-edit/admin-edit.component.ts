import { Component, OnInit } from '@angular/core';
import { AdminEditService } from 'src/services/admin-edit.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  
  respo:any;
  respo1: any;

  constructor(
    private editservice:AdminEditService
  ) { }

  ngOnInit(): void {
    this.editData();
  }

  console(){
    console.log(this.respo.id);
  }

  editData(){
    debugger;
    this.editservice.adminEdit().subscribe((res:any)=>{
      console.log(res);
      this.respo=res.Details;

//       const respo1=res.Details[];
//       // const respo = ['a', 'b', 'c'];
// const array2 = ['d', 'e', 'f'];
// const array3 = respo.concat(respo1);
// console.log(array3);

      
    })
  }

}
