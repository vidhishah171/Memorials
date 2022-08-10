import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/services/login.service';
import { UserProfileService } from 'src/services/user-profile.service';

@Component({
  selector: 'app-user-to-user-contact',
  templateUrl: './user-to-user-contact.component.html',
  styleUrls: ['./user-to-user-contact.component.css']
})
export class UserToUserContactComponent implements OnInit {
  inviteList: any;
  inviteList1: any;
  totalLength: any;
  page: number = 1;
  userpic: any;
  firstname: any;
  loginData: any;
  condition: boolean;
  lastname: any;
  userpicSender: any;
  firstnameSender: any;
  lastnameSender: any;
  userSearchFirstnameNew: string;
  senderMessage: any;
  userReceiver: any;
  msg: any;
  msgData: any;

  constructor(
    public userProfile: UserProfileService,
    private spiner: NgxSpinnerService,
    public loginservice: LoginService,
  ) { }

  toggleDisplay: boolean = false;
  paginationHide: boolean = false;
  imageDisplay: boolean = false;

  imageDisplay1: boolean = false;
  ngOnInit(): void {
    this.getData();
    this.inviteUserList();
    this.paginationHide = false;
    this.myProfileData();
    this.receiveMessage();
  }
  // for user after the login
  getData() {
    var userLoginData = localStorage.getItem('myData')
    var loginAfterRefresh = JSON.parse(userLoginData);
    if (loginAfterRefresh) {
      this.loginData = loginAfterRefresh.user[0].firstname;
      this.loginservice.loginSaveData = this.loginData;
      this.loginservice.loginAllData = loginAfterRefresh.user[0];
      this.loginservice.islogin = true;
    } else {
      this.condition = true;
    }
  }

  inviteUserList() {
    this.spiner.show();
    this.userProfile.inviteUserListData().subscribe((inviteData: any) => {
      this.inviteList = inviteData.Data;
      this.inviteList1 = inviteData.Data;
      this.totalLength = this.inviteList.length;
      this.spiner.hide();
    })
  }

  displaySearchData(data) {
    this.toggleDisplay = true;
    var userSearchFirstname = data.target.value;
    var userSearchFirstname = userSearchFirstname?.toLowerCase();
    if (userSearchFirstname == '') {
      this.toggleDisplay = false;
      this.paginationHide = false;
    } else if (userSearchFirstname != '') {
      this.inviteList = this.inviteList1.filter(dataSearch => dataSearch?.name?.toLowerCase().includes(userSearchFirstname));
      this.totalLength = this.inviteList.length;
      this.paginationHide = true;
    }
    else if (userSearchFirstname == '') {
      this.inviteList = this.inviteList1;
      this.paginationHide = false;
    }
  }

  myProfileData() {
    this.spiner.show();
    var ProfileId = { "user_id": this.loginservice.loginAllData.id }
    this.userProfile.userProfileDetails(ProfileId).subscribe((data1: any) => {
      this.userpic = data1.Data[0].userpic;
      this.firstname = data1.Data[0].firstname;
      this.loginservice.loginSaveData = this.firstname;
      this.lastname = data1.Data[0].lastname;
      this.imageDisplay = true;
      this.spiner.hide();
    })
  }

  goToUserMessage(userData) {
    this.userProfile.senderUserId = userData;
    this.toggleDisplay = false;
    this.spiner.show();
    var ProfileId = { "user_id": userData }
    this.userProfile.userProfileDetails(ProfileId).subscribe((dataNew: any) => {
      this.userpicSender = dataNew.Data[0].userpic;
      this.firstnameSender = dataNew.Data[0].firstname;
      this.loginservice.loginSaveData = this.firstname;
      this.lastnameSender = dataNew.Data[0].lastname;
      this.imageDisplay1 = true;
      this.userSearchFirstnameNew = ''
      this.spiner.hide();
    })
  }
  sendMessage() {
    var sendMessageData = {
      "receiver_id": this.userProfile.senderUserId,
      "sender_id": this.loginservice.loginAllData.id,
      "msg": this.senderMessage
    }
    this.userProfile.receiveMessageDetails(sendMessageData).subscribe((data: any) => {

    })
  }

  receiveMessage() {
    var receiverId = {
      "receiver_id": this.loginservice.loginAllData.id,
    }
    this.userProfile.receiveMessageDetails(receiverId).subscribe((data: any) => {
      this.msg = data.Data;
      // for (const value of Object.values(this.msg)) {
      //   console.log(value); // 👉️ Tom, 30
      // }
    })
  }

  messageBox(logeedUserData, senderUserData) {
    var receiverId = {
      "logged_user_id": logeedUserData,
      "receiver_id": senderUserData
    }
    this.userProfile.receiveMessagesOnly(receiverId).subscribe((data: any) => {
      this.msgData = data.Data;
    })
  }
}