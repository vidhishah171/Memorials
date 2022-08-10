import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';
import { UserProfileService } from 'src/services/user-profile.service';
import { AdminEditPopupComponent } from '../admin-edit/admin-edit-popup/admin-edit-popup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  p = this.loginservice.loginSaveData;
  isvalid: boolean = false;
  respo: any;
  respo1: any;
  respo2: any;
  showNewDiv: number;
  respo3: any;
  respo4: any;
  respo5: any;
  respo6: any;
  showLabel: number;
  isVisible: boolean;
  respo7: any;
  respo8: any;
  loginData: any;
  condition: boolean;
  respo9: any;
  respo10: any;
  firstname: any;
  respo11: any;
  respo12: any;
  constructor(
    public loginservice: LoginService,
    public dialog: MatDialog,
    public editservice: AdminEditService,
    public router: Router,
    private spiner: NgxSpinnerService,
    public profileService: UserProfileService,
  ) { }

  ngOnInit(): void {
    this.getData();
    this.editData();
    this.buttonLanguage(this.editservice.numLabel);
  }

  getData() {
    var userLoginData = localStorage.getItem('myData')
    var loginAfterRefresh = JSON.parse(userLoginData);
    if (loginAfterRefresh) {
      if (loginAfterRefresh.user[0].is_admin == 1) {
        this.loginservice.isVisible = true;
      }
      this.loginData = loginAfterRefresh.user[0].firstname;
      this.loginservice.loginAllData = loginAfterRefresh.user[0];
      this.loginservice.islogin = true;
      this.myProfileData();
    } else {
      this.condition = true;
    }

    if (loginAfterRefresh == null) {
      this.loginservice.isUser = false;
    } else
      if (loginAfterRefresh.user[0].status == 0) {
        this.loginservice.isUser = false;
      } else {
        this.loginservice.isUser = true;

      }
  }

  myProfileData() {
    var ProfileId = { "user_id": this.loginservice.loginAllData.id }
    this.profileService.myProfileDetails(ProfileId).subscribe((data: any) => {
      this.firstname = data.user_data[0].firstname;
      this.loginservice.loginSaveData = this.firstname;
    });
  }
  //  For logout
  userLogout() {
    this.spiner.show();
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      this.router.navigate([''])
        .then(() => {
          this.spiner.hide()
          window.location.reload();
        });
    }, 1);
  }


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
    } else if (num == 7) {
      this.showNewDiv = 7;
      this.isvalid = true;
    } else if (num == 8) {
      this.showNewDiv = 8;
      this.isvalid = true;
    } else if (num == 9) {
      this.showNewDiv = 9;
      this.isvalid = true;
    } else if (num == 10) {
      this.showNewDiv = 10;
      this.isvalid = true;
    } else if (num == 11) {
      this.showNewDiv = 11;
      this.isvalid = true;
    } else if (num == 12) {
      this.showNewDiv = 12;
      this.isvalid = true;
    }
  }

  buttonLanguage(num) {
    if (num == 1) {
      this.showLabel = 1;
    } else if (num == 2) {
      this.showLabel = 2;
    } else if (num == 3) {
      this.showLabel = 3;
    } else {
    }
    this.editservice.numLabel = num;
  }

  openDialogue1() {
    this.isvalid = false;
  }

  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      this.respo = res.Details;
      this.respo1 = this.respo[29];
      this.respo2 = this.respo[30];
      this.respo3 = this.respo[42];
      this.respo4 = this.respo[32];
      this.respo5 = this.respo[36];
      this.respo6 = this.respo[37];
      this.respo7 = this.respo[37];
      this.respo8 = this.respo[194];
      this.respo9 = this.respo[242];
      this.respo10 = this.respo[247];
      this.respo11 = this.respo[248];
      this.respo12 = this.respo[259];
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