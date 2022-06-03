import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { UserProfileService } from 'src/services/user-profile.service';

@Component({
  selector: 'app-visitor-condolence-popup',
  templateUrl: './visitor-condolence-popup.component.html',
  styleUrls: ['./visitor-condolence-popup.component.css']
})
export class VisitorCondolencePopupComponent implements OnInit {

  constructor(
    public profileService: UserProfileService,
    public recentService: RecentMeorialsService,
    public loginservice: LoginService,
  ) { }

  condoText:any;

  ngOnInit(): void {
  }

  saveCondolence(data){
    debugger
    var condoData={
    // user_id : this.recentService.userUserIdData,
    user_id : this.loginservice.loginAllData,
    grab_id : this.recentService.userGrabIdData2,
    comment : data.form.value.condoText
  }
    this.profileService.saveCondo(condoData).subscribe(condoRes=>{
      debugger;
      console.log(condoRes);
    })
  }

}
