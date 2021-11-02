import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { clear } from 'console';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { CreateMemorialService } from 'src/services/create-memorial.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName: string;
  ol: any;
  loginData: any;
  condition: boolean;
  constructor(
    private service: LoginService,
    private service1: CreateMemorialService,

    private route: ActivatedRoute,
    private router: Router,
    public snack: MatSnackBar

  ) { }

  data: any = [];
  ngOnInit(): void {

    // For clear create memorial page after goes to another page
    this.service1.createMemorial.g_firstname = '';
    this.service1.createMemorial.g_lastname = '';
    this.service1.createMemorial.birthplace = '';
    this.service1.createMemorial.deathplace = '';
    this.service1.createMemorial.DOB = '';
    this.service1.createMemorial.birthname = '';
    this.service1.createMemorial.DOD = '';

    this.service1.createMemorial.firstname = '';
    this.service1.createMemorial.lastname = '';
    this.service1.createMemorial.password = '';
    this.service1.createMemorial.password1 = '';
    this.service1.createMemorial.email = '';
    this.service1.createMemorial.streetname = '';
    this.service1.createMemorial.zipcode = '';
    this.service1.createMemorial.hometown = '';
    this.service1.createMemorial.voucher = '';
    this.service1.saveCanvas1 = '';
  }

  
  login(logData: any) {
    debugger
    this.service.userLogin(logData.value)
      .subscribe(responce => {
        debugger;
        this.data = responce;
        console.log(this.data);

        // console.log(this.data.user[0].firstname);
        // console.log(JSON.stringify(this.data));
        // this.ol=JSON.stringify(this.data);

        // this.service.sendUserData(true,this.data.firstname);        

        if (this.data.status === "success") {
          this.loginData = this.data.user[0].firstname;
          this.service.loginSaveData = this.loginData;
          this.router.navigate(['']);
          this.service.islogin = true;
        } else {
          this.router.navigate(['/login']);
          this.condition=true;
          // this.snackBar("Please check Email and password", "alert-danger");
        }

        // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // this.router.navigateByUrl(returnUrl);

      },
        error => {
          console.log(error);

        }
      )


  }
  snackBar(message: string, panelClass: string) {
    this.snack.openFromComponent(SnackbarComponent, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'left',
      data: message,
      panelClass: panelClass,


    })
  }

}
