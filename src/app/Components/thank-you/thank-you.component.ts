import { Component, OnInit } from '@angular/core';
import { AdminEditService } from 'src/services/admin-edit.service';
import { CreateMemorialService } from 'src/services/create-memorial.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  showNewDiv: number;
  isvalid: boolean;
  respo: any;
  respo1: any;
  respo2: any;
  respo3: any;
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
    public service:CreateMemorialService,
    public editservice: AdminEditService,
    public loginservice:LoginService,
    
    ) { }

  ngOnInit(): void {
    this.editData();

  }


   // Code for labels

   openDialogue(num): void {

    if (num == 1) {
      this.showNewDiv = 1;
      this.isvalid = true;
    } else if (num == 2) {
      this.showNewDiv = 2;
      this.isvalid = true;
    } else if (num == 3) {
      this.showNewDiv = 3;
      this.isvalid = true;
    } else if (num == 4) {
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
      console.log(res);
      this.respo = res.Details;
      this.respo1 = this.respo[176];
      this.respo2 = this.respo[177];
      this.respo3 = this.respo[178];
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
      //191
    });
  }

  postEditData(editDataNew: any) {
    var formdata = new FormData();
    formdata.append('id', editDataNew.value.id);
    formdata.append('en', editDataNew.value.en);
    formdata.append('de', editDataNew.value.de);
    formdata.append('fr', editDataNew.value.fr);

    this.editservice.editPostData(formdata).subscribe(response => {
      console.log(response);
    })
  }



}
