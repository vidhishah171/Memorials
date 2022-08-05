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
      // this.router.navigate(['/login']);
      this.condition = true;
      // this.snackBar("Please check Email and password", "alert-danger");
    }
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


  displaySearchData(data) {
    debugger
    this.toggleDisplay = true;
    var userSearchFirstname = data.target.value;
    var userSearchFirstname = userSearchFirstname?.toLowerCase();

    if (userSearchFirstname == '') {
      this.toggleDisplay = false;
      // this.dialogRef.updateSize('500px', '200px');
      this.paginationHide = false;


    } else if (userSearchFirstname != '') {
      this.inviteList = this.inviteList1.filter(dataSearch => dataSearch?.name?.toLowerCase().includes(userSearchFirstname));
      debugger
      // this.dialogRef.updateSize('500px', '500px');
      this.totalLength = this.inviteList.length;
      this.paginationHide = true;
    }
    else if (userSearchFirstname == '') {
      this.inviteList = this.inviteList1;
      this.paginationHide = false;
    }
  }


  myProfileData() {
    debugger
    // this.spiner.show();
    this.spiner.show();
    var ProfileId = { "user_id": this.loginservice.loginAllData.id }
    this.userProfile.userProfileDetails(ProfileId).subscribe((data1: any) => {
      console.log(data1);
      this.userpic = data1.Data[0].userpic;
      this.firstname = data1.Data[0].firstname;
      this.loginservice.loginSaveData = this.firstname;
      this.lastname = data1.Data[0].lastname;
      this.imageDisplay = true;
      this.spiner.hide();
    })
  }

  goToUserMessage(userData) {
    debugger
    this.userProfile.senderUserId = userData;
    this.toggleDisplay = false;
    this.spiner.show();
    var ProfileId = { "user_id": userData }
    this.userProfile.userProfileDetails(ProfileId).subscribe((dataNew: any) => {
      console.log(dataNew);
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
    debugger
    var sendMessageData = {
      "receiver_id": this.userProfile.senderUserId,
      "sender_id": this.loginservice.loginAllData.id,
      "msg": this.senderMessage
      
    }
    this.userProfile.receiveMessageDetails(sendMessageData).subscribe((data: any) => {
      debugger
    })
  }

  receiveMessage() {
    debugger
    var receiverId = {
      "receiver_id": this.loginservice.loginAllData.id,
      // "receiver_id" : this.userProfile.senderUserId
    }
    this.userProfile.receiveMessageDetails(receiverId).subscribe((data: any) => {
      debugger
      this.msg = data.Data;


      // if (data != '') {
      //   var senderIdProfile = {
      //     "user_id": data.Data[0].sender_id
      //   }
      //   this.spiner.show();
      //   this.userProfile.userProfileDetails(senderIdProfile).subscribe((dataProfileNew: any) => {
      //     console.log(dataProfileNew);
      //     this.userReceiver = dataProfileNew.Data;
         
      //     // this.imageDisplay1 = true;
      //     // this.userSearchFirstnameNew = ''
      //     this.spiner.hide();
      //   })
      // }


    })
  }

  messageBox(logeedUserData,senderUserData){
    debugger
    var receiverId = {
      "logged_user_id": logeedUserData,
      "receiver_id" : senderUserData
    }
    this.userProfile.receiveMessagesOnly(receiverId).subscribe((data: any) => {
      debugger
      this.msgData = data.Data;

    })
  }
}
