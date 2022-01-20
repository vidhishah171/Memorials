import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { UserProfileService } from 'src/services/user-profile.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  showDiv: number;
  isShow: boolean;
  getUserMemoData: any;
  condition: boolean;
  loginData: any;



  constructor(
    public loginservice: LoginService,
    public profileService: UserProfileService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData()
    this.getUserMemorial();
  }
  // for user after the login
  getData() {
    var userLoginData = localStorage.getItem('myData')
    var loginAfterRefresh = JSON.parse(userLoginData);

    if (loginAfterRefresh) {
      debugger
      this.loginData = loginAfterRefresh.user[0].firstname;
      this.loginservice.loginSaveData = this.loginData;
      this.loginservice.loginAllData = loginAfterRefresh.user[0];
      this.loginservice.islogin = true;
    } else {
      this.router.navigate(['/login']);
      this.condition = true;
      // this.snackBar("Please check Email and password", "alert-danger");
    }
  }

  goesToEditMemo(data) {
    this.profileService.userDetail = data;
    this.router.navigate(['/edit-memorial']);

  }
  goesToEditMemo1(data1) {
    this.profileService.userDetailUserId = data1;
  }




  getUserMemorial() {
    var data = { "user_id": this.loginservice.loginAllData?.id }
    this.profileService.userCreatedMemorial(data)
      .subscribe(userRes => {
        console.log(userRes);
        this.getUserMemoData = userRes["User Memorials"];
        // this.profileService.userDetail=userRes["User Memorials"].grab_id;
      })

  }


  openDiv(num) {
    if (num == 0) {
      this.showDiv = 0.1;
      this.isShow = true;
    }
  }
  openDiv1() {
    this.isShow = false;
  }
}
