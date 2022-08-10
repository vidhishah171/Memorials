import { Component, OnInit } from '@angular/core';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-memory-image',
  templateUrl: './memory-image.component.html',
  styleUrls: ['./memory-image.component.css']
})
export class MemoryImageComponent implements OnInit {
  respo: any;
  respo15: any;
  respo16: any;
  respo17: any;
  respo18: any;
  respo19: any;
  isvalid: boolean;
  showNewDiv: number;
  respo20: any;

  constructor(
    public editservice: AdminEditService,
    public loginservice: LoginService,

  ) { }

  ngOnInit(): void {
    this.editData();
  }
  openDialogue(num): void {
    if (num == 15) {
      this.showNewDiv = 15;
      this.isvalid = true;
    } else if (num == 16) {
      this.showNewDiv = 16;
      this.isvalid = true;
    } else if (num == 17) {
      this.showNewDiv = 17;
      this.isvalid = true;
    } else if (num == 18) {
      this.showNewDiv = 18;
      this.isvalid = true;
    } else if (num == 19) {
      this.showNewDiv = 19;
      this.isvalid = true;
    } else if (num == 20) {
      this.showNewDiv = 20;
      this.isvalid = true;
    }
  }

  openDialogue1() {
    this.isvalid = false;
  }

  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      this.respo = res.Details;
      this.respo15 = this.respo[164];
      this.respo16 = this.respo[165];
      this.respo17 = this.respo[166];
      this.respo18 = this.respo[167];
      this.respo19 = this.respo[168];
      this.respo20 = this.respo[246];
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
