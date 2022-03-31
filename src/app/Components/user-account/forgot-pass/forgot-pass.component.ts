import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { environment } from 'src/environments/environment';
import { AdminEditService } from 'src/services/admin-edit.service';
import { CreateMemorialService } from 'src/services/create-memorial.service';
import { ForgotPasswordService } from 'src/services/forgot-password.service';
import { LoginService } from 'src/services/login.service';
import { ForgotPassActivePopComponent } from '../../forgot-pass-acitve/forgot-pass-active-pop/forgot-pass-active-pop.component';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  respo: any;
  respo1: any;
  isvalid: boolean;
  showNewDiv: number;


  public subscription: Subscription;
  token: any;


  forPassword: any;
  respo2: any;
  respo3: any;
  respo4: any;
  respo5: any;



  constructor(
    public editservice: AdminEditService,
    private service1: CreateMemorialService,
    public service2: ForgotPasswordService,
    public loginservice: LoginService,

    public route: ActivatedRoute,
    public http: HttpClient,
    private router: Router,
    public snack: MatSnackBar,
    public dialog: MatDialog,
    private spiner: NgxSpinnerService,


  ) { 
    this.loginservice.isFooterLogin = false;
    
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.clickDiv();
    }, 1000);
  }

  ngOnInit(): void {
    this.editData();
  }

  clickDiv() {
    debugger
    var test = document.getElementById("navDiv");
    if (test != null) {
      test.style.position = 'absolute';
    }

  }


  // forgotPasswordActivation(){
  //   this.subscription =this.route.queryParamMap.subscribe(queryParams=>{
  //      this.token=queryParams.get('auth_token');
  //      this.service2.saveAuthToken=this.token;
  //     let url= environment.baseUrl+"API/public/userAuth/" + this.token;
  //     this.http.get(url).subscribe((result:any)=>
  //       {
  //         console.log(result);
  //       });
  //     });
  //   }


  register(data: any) {
    debugger;
    this.spiner.show();
    this.forPassword = data.value;
    // var formdata = new FormData();
    // // formdata.append('email_id', this.service.saveEmailId);
    // formdata.append('auth_token', this.service2.saveAuthToken);
    // formdata.append('pwd', this.forPassword.pwd);

    var changePasswordData = { "email_id": this.loginservice.loginAllData.email, "pwd": this.forPassword.pwd }

    this.service2.ChangePassword(changePasswordData).subscribe(responce => {
      console.log(responce);
      this.spiner.hide();
      debugger;
      var changePassworData: any = responce
      if (changePassworData.status === "success") {
        // this.dialog.open(ForgotPassActivePopComponent);
        localStorage.clear();
        setTimeout(() => {
          this.router.navigate(['/login'])
            .then(() => {
              window.location.reload();
            });
        }, 4000);
        this.snackBar("Your password has been reset, Please check your email and login again", "alert-danger");

      }
    })
    // this.service2.pwd='';
    // this.service2.pwd1='';
  }

  snackBar(message: string, panelClass: string) {
    this.snack.openFromComponent(SnackbarComponent, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: message,
      panelClass: panelClass,


    })

  };


  // Code for labels

  openDialogue(num): void {

    if (num == 1) {
      this.showNewDiv = 1;
      this.isvalid = true;
    } else if (num == 2) {
      this.showNewDiv = 2;
      this.isvalid = true;
    } else if (num == 3) {
      this.showNewDiv = 3;
      this.isvalid = true;
    } else if (num == 4) {
      this.showNewDiv = 4;
      this.isvalid = true;
    }
    else if (num == 5) {
      this.showNewDiv = 5;
      this.isvalid = true;
    }
  }
  openDialogue1() {
    this.isvalid = false;
  }

  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      console.log(res);
      this.respo = res.Details;
      this.respo1 = this.respo[161];
      this.respo2 = this.respo[162];
      this.respo3 = this.respo[163];
      this.respo4 = this.respo[44];
      this.respo5 = this.respo[193];

    });
  }

  postEditData(editDataNew: any) {
    var formdata = new FormData();
    formdata.append('id', editDataNew.value.id);
    formdata.append('en', editDataNew.value.en);
    formdata.append('de', editDataNew.value.de);
    formdata.append('fr', editDataNew.value.fr);

    this.editservice.editPostData(formdata).subscribe(response => {
      console.log(response);
    })
  }


}
