import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debug } from 'console';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { ForgotPasswordService } from 'src/services/forgot-password.service';
import { LoginService } from '../../../services/login.service';
import { ForgotPassPopupComponent } from './forgot-pass-popup/forgot-pass-popup.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  data1: any=[];
  condition: boolean;

  constructor(
    public service : LoginService,
    public service1 : ForgotPasswordService,
    public snack1: MatSnackBar,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }

  forgotPassword(forgotData:any){
    debugger
    this.service1.saveEmailId=forgotData.value.email_id;
    this.service.forgotPassword(forgotData.value)
    .subscribe(
      responce=>{
        console.log(responce);
        this.data1=responce;
        
        if (this.data1.status === "success") {
          this.condition=false;
          this.dialog.open(ForgotPassPopupComponent);
          // this.openDialogue()
          // this.snackBar("Your password has been reset, Please check your email and login again", "alert-danger");
        }else{
          this.condition=true;
      }


      },
      error=>{
        console.log(error);
        
      }
    )
  }

  snackBar(message: string, panelClass: string) {
    this.snack1.openFromComponent(SnackbarComponent, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'left',
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
  }
