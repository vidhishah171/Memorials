import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { clear } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { AdminEditService } from 'src/services/admin-edit.service';
import { CreateMemorialService } from 'src/services/create-memorial.service';
import { LoginService } from '../../../services/login.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { createMemorial } from 'src/app/Model/createMemorial';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]),
    password: new FormControl('', Validators.required)
  })
  get email() { return this.loginForm.get('username') }
  get password() { return this.loginForm.get('password') }

  public userName: string;
  ol: any;
  loginData: any;
  condition: boolean;
  respo: any;
  respo1: any;
  showNewDiv: number;
  isvalid: boolean;
  respo2: any;
  respo3: any;
  respo4: any;
  respo5: any;
  respo6: any;
  respo7: any;
  respo8: any;

  constructor(
    public service: LoginService,
    private service1: CreateMemorialService,
    public editservice: AdminEditService,
    private route: ActivatedRoute,
    private router: Router,
    public snack: MatSnackBar,
    private spiner: NgxSpinnerService,
  ) {
    this.service.otherPage = true;
    this.service.isFooterLogin = false;
  }

  data: any = [];

  ngAfterViewInit() {
    setTimeout(() => {
      this.clickDiv();
    }, 1000);
  }

  ngOnInit(): void {
    this.editData();
  }
  errorDisplay: boolean = false;
  errorValue(event) {
    if (event.target.value.length < 0) {
      this.errorDisplay = true;
    }
    else if (event.target.value != "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$") {
      this.errorDisplay = true;
    }
    else {
      this.errorDisplay = false;
    }
  }
  clickDiv() {
    var test = document.getElementById("navDiv");
    if (test != null) {
      test.style.position = 'absolute';
    }
  }

  login() {
    this.spiner.show();
    this.service.userLogin(this.loginForm.value)
      .subscribe(responce => {
        this.spiner.hide();
        this.data = responce;
        if (this.data.status === "success") {
          this.loginData = this.data.user[0].firstname;
          this.service.loginSaveData = this.loginData;
          this.service.loginAllData = this.data.user[0];
          this.service.mapData = this.service.loginAllData.hometown
          this.setData();
          this.service.islogin = true;
        } else {
          this.router.navigate(['/login']);
          this.condition = true;
        }
        if (this.data.user[0].is_admin == 0) {
          this.service.isVisible = false;
        } else {
          this.service.isVisible = true;
        }
        // For user login
        if (this.data.user[0].status == 0) {
          this.service.isUser = false;
        } else {
          this.service.isUser = true;
        }
        var userChecking = sessionStorage.getItem('userCheckingData')
        var userCheckingData = JSON.parse(userChecking);
        if (userCheckingData == this.data.user[0].email) {
          this.router.navigate(['/create-memorial']);
        } else {
          this.router.navigate(['/user-account']);
        }
      },
        error => {
          console.log(error);
        })
  }
  // for logout
  setData() {
    const jsonData = JSON.stringify(this.data)
    localStorage.setItem('myData', jsonData)
  }

  snackBar(message: string, panelClass: string) {
    this.snack.openFromComponent(SnackbarComponent, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: message,
      panelClass: panelClass,
    })
  }
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
      this.respo = res.Details;
      this.respo1 = this.respo[44];
      this.respo2 = this.respo[45];
      this.respo3 = this.respo[46];
      this.respo4 = this.respo[49];
      this.respo5 = this.respo[50];
      this.respo6 = this.respo[192];
      this.respo7 = this.respo[257];
      this.respo8 = this.respo[258];
    });
  }

  postEditData(editDataNew: any) {
    var formdata = new FormData();
    formdata.append('id', editDataNew.value.id);
    formdata.append('en', editDataNew.value.en);
    formdata.append('de', editDataNew.value.de);
    formdata.append('fr', editDataNew.value.fr);
    this.editservice.editPostData(formdata).subscribe(response => {
    })
  }
}
