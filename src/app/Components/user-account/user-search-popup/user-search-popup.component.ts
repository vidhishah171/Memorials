import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserProfileService } from 'src/services/user-profile.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-search-popup',
  templateUrl: './user-search-popup.component.html',
  styleUrls: ['./user-search-popup.component.css']
})
export class UserSearchPopupComponent implements OnInit {
  inviteList: any;
  inviteList1: any;
  totalLength: any;
  page: number = 1;

  paginationHide: boolean = true;
  isDisplayBelowDiv: boolean = false;
  fullName: () => void;

  constructor(
    public userProfile: UserProfileService,
    private spiner: NgxSpinnerService,
    private router: Router,
    public dialogRef: MatDialogRef<UserSearchPopupComponent>

  ) { }

  ngOnInit(): void {
    this.inviteUserList();
    this.dialogRef.updateSize('500px', '200px');
    this.paginationHide = false;
  }

  inviteUserList() {

    this.spiner.show();
    this.userProfile.inviteUserListData().subscribe((inviteData: any) => {
      console.log(inviteData);
      this.inviteList = inviteData.Data;
      this.inviteList1 = inviteData.Data;
      this.totalLength = this.inviteList.length;
      this.spiner.hide();

      // for (let item of this.inviteList1) {
      //   var person = {
      //     firstname: item.firstname,
      //     lastname: item.lastname,
      //     fullname: function () {
      //       this.fullname = person.firstname + ' ' + person.lastname
      //     }
      //   }
      //   person.fullname();
      //   console.log(person.fullname)
      //   this.fullName = person.fullname;
      // }



    })
  }
  inviteUser(userEmail) {
    var userEmailId = {
      "email_id": userEmail
    }
    this.userProfile.sendInvitationUser(userEmailId).subscribe(invitationRes => {
      console.log(invitationRes);
    })
  }

  searchInviteUser(data) {
    // var userSearchFirstname = data.form.value.searchUser;
    var userSearchFirstname = data.target.value;
    var userSearchFirstname = userSearchFirstname?.toLowerCase();

    if (userSearchFirstname == '') {
      this.isDisplayBelowDiv = false;
      this.dialogRef.updateSize('500px', '200px');
      this.paginationHide = false;


    } else if (userSearchFirstname != '') {
      this.inviteList = this.inviteList1.filter(dataSearch => dataSearch?.name?.toLowerCase().includes(userSearchFirstname));
      debugger
      this.dialogRef.updateSize('500px', '500px');
      this.totalLength = this.inviteList.length;
      this.paginationHide = true;
      this.isDisplayBelowDiv = true;
    }
    else if (userSearchFirstname == '') {
      this.inviteList = this.inviteList1;
      this.paginationHide = true;
    }
  }


  goToUserDetailPage(userDataId) {
    if (userDataId != '') {
      debugger
      this.userProfile.userDetailId = userDataId;
      this.router.navigate(['/user-profile-details']);
      this.dialogRef.close();

      const jsonDataUserDetail = JSON.stringify(userDataId)
      localStorage.setItem('userDataDetail', jsonDataUserDetail)

    }
  }
}

