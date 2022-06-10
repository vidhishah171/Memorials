import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/services/user-profile.service';

@Component({
  selector: 'app-invite-popup',
  templateUrl: './invite-popup.component.html',
  styleUrls: ['./invite-popup.component.css']
})
export class InvitePopupComponent implements OnInit {
  inviteList: any;
  inviteList1: any;

  constructor(public userProfile:UserProfileService) { }

  ngOnInit(): void {
    this.inviteUserList();
  }

  inviteUserList(){
    this.userProfile.inviteUserList().subscribe((inviteData:any)=>{
      console.log(inviteData);
      this.inviteList = inviteData.Data;
      this.inviteList1 = inviteData.Data;

    })
  }
  inviteUser(userEmail){
    var userEmailId={
      "email_id":userEmail
    }
    this.userProfile.sendInvitationUser(userEmailId).subscribe(invitationRes=>{
      console.log(invitationRes);
    })
  }

  searchInviteUser(data){
    var userSearchFirstname = data.target.value;
    if(userSearchFirstname != '')
    this.inviteList = this.inviteList1.filter(dateSearch => dateSearch.firstname === userSearchFirstname);
  }

  searchInviteUserNew(userSearchLastname){
    if(userSearchLastname != '')
    this.inviteList = this.inviteList.filter(dateSearch => dateSearch.lastname === userSearchLastname);
  }

}
