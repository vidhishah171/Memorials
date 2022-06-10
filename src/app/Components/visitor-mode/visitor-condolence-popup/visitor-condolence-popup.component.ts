import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { UserProfileService } from 'src/services/user-profile.service';
import { VisitorModeComponent } from '../visitor-mode.component';

@Component({
  selector: 'app-visitor-condolence-popup',
  templateUrl: './visitor-condolence-popup.component.html',
  styleUrls: ['./visitor-condolence-popup.component.css']
})
export class VisitorCondolencePopupComponent implements OnInit {
  memorialDetails1: any;



  constructor(
    public profileService: UserProfileService,
    public recentService: RecentMeorialsService,
    public loginservice: LoginService,
    public snack: MatSnackBar,
    private spiner : NgxSpinnerService,

  ) { }

  condoText:any;

  ngOnInit(): void {
  }

  saveCondolence(data){
    var condoData={
    // user_id : this.recentService.userUserIdData,
    user_id : this.loginservice.loginAllData,
    grab_id : this.recentService.userGrabIdData2,
    comment : data.form.value.condoText
  }
  this.spiner.show();
    this.profileService.saveCondo(condoData).subscribe(condoRes=>{
      console.log(condoRes);
      this.snackBar("Condolence successfully added..", "alert-green");
      this.spiner.hide();
      // this.testEvent.emit();
      this.recentService.getMeorialDetail();
    })
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

}
