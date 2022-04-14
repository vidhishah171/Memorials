import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from '../../../services/recent-meorials.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {

  Memorials: any;// Recent Memorial Variable
  PremiumMemorials: any;
  showNewDiv: number;
  isvalid: boolean;
  respo: any;
  respo1: any;
  respo2: any;
  respo3: any;

  constructor(
    private service: RecentMeorialsService,
    public editservice: AdminEditService,
    public loginservice: LoginService,
    private router: Router,

  ) { }


  ngOnInit(): void {
    this.getrecentMemorials();
    this.getPremiumMemorial();
    this.editData();

  }

  getrecentMemorials() {
    this.service.getRecentmemorials()
      .subscribe(
        (recentMemorial: any) => {
          if (recentMemorial) {
            this.Memorials = recentMemorial.Memorials;

            this.Memorials.map(function (item) { return item.fname = item.fname.replace(/[^a-zA-Z-.]/g, "") });
            this.Memorials.map(function (item) { return item.lname = item.lname.replace(/[^a-zA-Z-.]/g, "") });

          }
        },
        error => {
          if (error) {
            console.log(error);
          }

        }
      )
  }


  getPremiumMemorial() {
    this.service.getPremiumMemorials()
      .subscribe(
        (premiumMemorials: any) => {
          if (premiumMemorials) {
            this.PremiumMemorials = premiumMemorials.Memorials;

            this.PremiumMemorials.map(function (item) { return item.firstname = item.firstname.replace(/[^a-zA-Z-.]/g, "") });
            this.PremiumMemorials.map(function (item) { return item.lastname = item.lastname.replace(/[^a-zA-Z-.]/g, "") });
          }
        },
        error => {
          console.log(error);

        }
      )
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
    }
  }

  openDialogue1() {
    this.isvalid = false;
  }


  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      console.log(res);
      this.respo = res.Details;
      this.respo1 = this.respo[17];
      this.respo2 = this.respo[18];
      this.respo3 = this.respo[249];




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

  // recentMemorialUserId(data1){
  //   this.service.userUserIdData = data1;
  //   this.router.navigate(['/visitor-mode']);
  // }

  recentMemorialGrabId(data, data1) {
    console.log(data);

    if (data) {
      this.service.userGrabIdData2 = data;
      this.service.userUserIdData = data1;

      this.router.navigate(['/visitor-mode']);
    }
  }
}
