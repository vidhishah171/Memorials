import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { UserProfileService } from 'src/services/user-profile.service';

@Component({
  selector: 'app-display-condolences',
  templateUrl: './display-condolences.component.html',
  styleUrls: ['./display-condolences.component.css']
})
export class DisplayCondolencesComponent implements OnInit {
  caroucelCount: number = 1;
  imagesForCaroucelUser: any;
  getUserMemoData: any;
  loginData: any;
  condition: boolean;
  showTrashIcon:boolean=false;


  constructor(
    public service: RecentMeorialsService,
    public loginservice: LoginService,
    public profileService: UserProfileService,
    private spiner: NgxSpinnerService,
    public snack: MatSnackBar,


  ) { }

  ngOnInit(): void {
    this.getData();
    this.getUserMemorial();
  }

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

  getUserMemorial() {
    debugger
    var data = { "user_id": this.loginservice?.loginAllData?.id }
    this.profileService.userCreatedMemorial(data)
      .subscribe(userRes => {
        console.log(userRes);

        let tempArray:any[] = userRes["User Memorials"];
        tempArray = tempArray.sort((a,b)=>
           a.grab_id - b.grab_id
        )
        this.getUserMemoData = tempArray.reverse();


        // this.getUserMemoData = userRes["User Memorials"];
        for(let item of this.getUserMemoData){
          item.path= item.path +'?v='+this.service.index++;
        }
        if (this.caroucelCount == 1) {
          this.imagesForCaroucelUser = this.getUserMemoData.slice(0, 5);
        }
        // this.profileService.userDetail=userRes["User Memorials"].grab_id;
      })

  }


  nextCarousel() {
    this.caroucelCount++;

    if (this.caroucelCount == 2) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(5, 10);

    }
    if (this.caroucelCount == 3) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(10, 15);
    }
    if (this.caroucelCount == 4) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(15, 20);
    }
    if (this.caroucelCount == 5) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(20, 25);
    }
    if (this.caroucelCount == null) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(25, 30);
    }

  }

  prevCarousel() {
    
    this.caroucelCount = this.caroucelCount - 1;

    if (this.caroucelCount == 2) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(5, 10);
    }
    if (this.caroucelCount == 3) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(10, 15);
    }
    if (this.caroucelCount == 4) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(15, 20);
    }
    if (this.caroucelCount == 5) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(20, 25);
    }
    if (this.caroucelCount == 1 || null) {
      this.imagesForCaroucelUser = this.getUserMemoData.slice(0, 5);
    }

  }

  readCondolences(grabId){
    debugger
  this.service.userGrabIdData2 = grabId;
  this.service.getMeorialDetail();
  }

  condolencesComment(item:any){
    
    if(item.showFull)
    item.showFull=undefined;
    else
    item.showFull=true;
 }

 deleteCondolence(condoId){
  var condoIdNew={
    "comment_id" : `${condoId}`
  }
  this.spiner.show();
  this.profileService.deleteCondo(condoIdNew).subscribe(condoRes=>{
    console.log(condoRes);
    this.service.getMeorialDetail();
    this.spiner.hide();
    setTimeout(() => {
      this.snackBar("Condolences has been deleted..", "alert-danger");
    }, 1000);
    
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
