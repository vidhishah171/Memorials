import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
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

  fillEmailId: any;

  constructor(
    public userProfile: UserProfileService,
    private spiner: NgxSpinnerService,
    public snack: MatSnackBar,


  ) { }

  ngOnInit(): void {
    this.inviteUserList();
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
    debugger
    if(userEmail.form.value.userEmail == "" || userEmail.form.value.userName == "" || userEmail.form.value.userMsg == ""){
      this.snackBar("Please fill all details in the form", "alert-danger");
    }else{
    var userDetails = {
      "email_id": userEmail.form.value.userEmail,
      "name": userEmail.form.value.userName,
      "msg": userEmail.form.value.userMsg
    }
    this.spiner.show();
    this.userProfile.sendInvitationUser(userDetails).subscribe((invitationRes:any) => {
      if (invitationRes.status == "success") {
        this.spiner.hide();
        this.snackBar("Invitation sent successfully, please check your email ID", "alert-green");
        this.inviteUserData = false;
      }
    })
  }
}

  snackBar(message: string, panelClass: string) {
    this.snack.openFromComponent(SnackbarComponent, {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: message,
      panelClass: panelClass,


    })

  };

  searchInviteUser(data) {
    debugger
    // var userSearchFirstname = data.form.value.searchUser;
    var userSearchFirstname = data.target.value;

    var userSearchFirstname = userSearchFirstname?.toLowerCase();
    if (userSearchFirstname != '') {

      this.inviteList = this.inviteList1.filter(dataSearch => dataSearch?.name?.toLowerCase().includes(userSearchFirstname));
      this.totalLength = this.inviteList.length;
      // this.paginationHide = false;
    }
    else if (userSearchFirstname == '') {
      this.inviteList = this.inviteList1;
      this.totalLength = this.inviteList.length;
      this.paginationHide = true;
    }
  }

  inviteUserData: boolean = false;
  externalUser() {
    this.fillEmailId = '';
    this.inviteUserData = true;
  }
  externalUserClose() {
    this.inviteUserData = false;
  }

  inviteUserOpenForm(emailId) {
    debugger
    this.inviteUserData = true;
    this.fillEmailId = emailId;
  }

}
