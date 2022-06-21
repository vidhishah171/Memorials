import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserProfileService } from 'src/services/user-profile.service';

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
  fullName: () => void;

  constructor(
    public userProfile: UserProfileService,
    private spiner: NgxSpinnerService,

  ) { }

  ngOnInit(): void {
    this.inviteUserList();
  }

  inviteUserList() {
    
    this.spiner.show();
    this.userProfile.inviteUserList().subscribe((inviteData: any) => {
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
    var userSearchFirstname = data.form.value.searchUser;
    if (userSearchFirstname != '') {
      this.inviteList = this.inviteList1.filter(dataSearch => dataSearch.name === userSearchFirstname);
      this.paginationHide = false;
    }
    else if (userSearchFirstname == '') {
      this.inviteList = this.inviteList1;
      this.paginationHide = true;
    }
  }

}

