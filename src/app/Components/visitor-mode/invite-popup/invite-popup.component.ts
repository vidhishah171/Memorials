import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserProfileService } from 'src/services/user-profile.service';

@Component({
  selector: 'app-invite-popup',
  templateUrl: './invite-popup.component.html',
  styleUrls: ['./invite-popup.component.css']
})
export class InvitePopupComponent implements OnInit {
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
    debugger
    // var userSearchFirstname = data.form.value.searchUser;
    var userSearchFirstname = data.target.value;

    var userSearchFirstname = userSearchFirstname?.toLowerCase();
    if (userSearchFirstname != '') {
      
      this.inviteList = this.inviteList1.filter(dataSearch => dataSearch?.name?.toLowerCase().includes(userSearchFirstname));
      this.totalLength=this.inviteList.length;
      // this.paginationHide = false;
    }
    // else if (userSearchFirstname == '') {
    //   this.inviteList = this.inviteList1;
    //   this.paginationHide = true;
    // }
  }

}
