import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debug } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { AdminEditService } from 'src/services/admin-edit.service';
import { ForgotPasswordService } from 'src/services/forgot-password.service';
import { LoginService } from '../../../services/login.service';
import { ForgotPassPopupComponent } from './forgot-pass-popup/forgot-pass-popup.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  data1: any = [];
  condition: boolean;
  showNewDiv: number;
  isvalid: boolean;
  respo: any;
  respo1: any;
  respo2: any;
  respo3: any;
  respo4: any;
  respo5: any;
  respo6: any;
  respo7: any;
  respo8: any;

  constructor(
    public service: LoginService,
    public service1: ForgotPasswordService,
    public snack1: MatSnackBar,
    public dialog: MatDialog,
    public editservice: AdminEditService,
    private router: Router,
    private spiner: NgxSpinnerService,


  ) { this.service.otherPage = true; }

  ngAfterViewInit() {
    setTimeout(() => {
      this.clickDiv();
    }, 1000);
  }


  ngOnInit(): void {
    this.editData();
  }

  clickDiv(){
    debugger
    var test = document.getElementById("navDiv");
      if (test != null) {
        test.style.position = 'absolute';
      }

  }

  forgotPassword(forgotData: any) {
    this.spiner.show();
    this.service1.saveEmailId = forgotData.value.email_id;
    this.service.forgotPassword(forgotData.value)
      .subscribe(
        responce => {
          console.log(responce);
          this.data1 = responce;
          this.spiner.hide();
          if (this.data1.status === "success") {
            this.condition = false;
            // this.dialog.open(ForgotPassPopupComponent);
            // this.openDialogue()

            localStorage.clear();
            setTimeout(() => {
              this.router.navigate(['/login'])
                .then(() => {
                  window.location.reload();
                });
            }, 4000);
            this.snackBar("Your password has been reset, Please check your email and login again", "alert-danger");

          } else {
            this.condition = true;
          }


        },
        error => {
          console.log(error);

        }
      )
  }

  snackBar(message: string, panelClass: string) {
    this.snack1.openFromComponent(SnackbarComponent, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: message,
      panelClass: panelClass,


    })
  }


  // openDialogue(){
  //   const dialogRef = this.dialog.open(ForgotPassPopupComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }


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
    } else if (num == 5) {
      this.showNewDiv = 5;
      this.isvalid = true;
    } else if (num == 6) {
      this.showNewDiv = 6;
      this.isvalid = true;
    } else if (num == 7) {
      this.showNewDiv = 7;
      this.isvalid = true;
    } else if (num == 8) {
      this.showNewDiv = 8;
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
      this.respo1 = this.respo[149];
      this.respo2 = this.respo[151];
      this.respo3 = this.respo[152];
      this.respo4 = this.respo[153];
      this.respo5 = this.respo[154];
      this.respo6 = this.respo[155];
      this.respo7 = this.respo[156];
      this.respo8 = this.respo[2];
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


