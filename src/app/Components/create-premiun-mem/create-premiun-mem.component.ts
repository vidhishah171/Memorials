import { Component, OnInit } from '@angular/core';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-create-premiun-mem',
  templateUrl: './create-premiun-mem.component.html',
  styleUrls: ['./create-premiun-mem.component.css']
})
export class CreatePremiunMemComponent implements OnInit {
  showNewDiv: number;
  isvalid: boolean;
  respo: any;
  respo4: any;
  respo5: any;
  respo6: any;
  respo7: any;
  respo8: any;
  respo9: any;
  respo10: any;
  respo11: any;
  respo12: any;
  respo13: any;
  respo14: any;
  respo15: any;
  respo16: any;

  constructor(
    public loginservice:LoginService,
    public editservice: AdminEditService,


  ) { }

  ngOnInit(): void {
    this.editData();

  }

  // Code for labels

  openDialogue(num): void {

    if (num == 4) {
      this.showNewDiv = 4;
      this.isvalid = true;
    } else if (num == 5) {
      this.showNewDiv = 5;
      this.isvalid = true;
    } else if (num == 6) {
      this.showNewDiv = 6;
      this.isvalid = true;
    }else if (num == 7) {
      this.showNewDiv = 7;
      this.isvalid = true;
    }else if (num == 8) {
      this.showNewDiv = 8;
      this.isvalid = true;
    }else if (num == 9) {
      this.showNewDiv = 9;
      this.isvalid = true;
    }else if (num == 10) {
      this.showNewDiv = 10;
      this.isvalid = true;
    }else if (num == 11) {
      this.showNewDiv = 11;
      this.isvalid = true;
    }else if (num == 12) {
      this.showNewDiv = 12;
      this.isvalid = true;
    }else if (num == 13) {
      this.showNewDiv = 13;
      this.isvalid = true;
    }else if (num == 14) {
      this.showNewDiv = 14;
      this.isvalid = true;
    }else if (num == 15) {
      this.showNewDiv = 15;
      this.isvalid = true;
    }else if (num == 16) {
      this.showNewDiv = 16;
      this.isvalid = true;
    }
  }

  openDialogue1() {
    this.isvalid = false;
  }

  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      this.respo = res.Details;
      this.respo4 = this.respo[179];
      this.respo5 = this.respo[180];
      this.respo6 = this.respo[181];
      this.respo7 = this.respo[182];
      this.respo8 = this.respo[183];
      this.respo9 = this.respo[184];
      this.respo10 = this.respo[185];
      this.respo11 = this.respo[186];
      this.respo12 = this.respo[187];
      this.respo13 = this.respo[188];
      this.respo14 = this.respo[189];
      this.respo15 = this.respo[190];
      this.respo16 = this.respo[191];
    });
  }

  postEditData(editDataNew: any) {
    var formdata = new FormData();
    formdata.append('id', editDataNew.value.id);
    formdata.append('en', editDataNew.value.en);
    formdata.append('de', editDataNew.value.de);
    formdata.append('fr', editDataNew.value.fr);

    this.editservice.editPostData(formdata).subscribe(response => {
    })
  }

}
