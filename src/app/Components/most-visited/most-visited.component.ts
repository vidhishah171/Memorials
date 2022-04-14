import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { AdminEditService } from 'src/services/admin-edit.service';
import { HomeService } from 'src/services/home.service';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { MostVisitedService } from '../../../services/most-visited.service';


@Component({
  selector: 'app-most-visited',
  templateUrl: './most-visited.component.html',
  styleUrls: ['./most-visited.component.css']
})
export class MostVisitedComponent implements OnInit {

  mostVisitMemorial: any;
  showNewDiv: number;
  isvalid: boolean;
  respo1: any;
  respo: any;
  respo2: any;
  mostVisitMemorialLast: any;
  mostVisitMemorialfirst: any;
  firstname: any;
  lastname: any;
  searchText: any;
  dataSearch: any;
  dataSearch1: any;
  dataSearch2: any;
  searchResult: boolean;
  respo3: any;

  constructor(
    private service: MostVisitedService,
    public editservice: AdminEditService,
    public loginservice: LoginService,
    private recentService: RecentMeorialsService,
    public homeservice: HomeService,
    private router: Router,
    private spiner: NgxSpinnerService,
    public snack: MatSnackBar,




  ) { }

  ngOnInit(): void {
    
    this.getData();
    this.editData();

  }

  getData() {
    
    this.service.getMostVisMemorial().subscribe(
      (memorials: any) => {

        this.mostVisitMemorial = memorials.Memorials;
         this.mostVisitMemorial.map(function(item){return item.firstname = item.firstname.replace(/[^a-zA-Z-.]/g, "")});
         this.mostVisitMemorial.map(function(item){return item.lastname = item.lastname.replace(/[^a-zA-Z-.]/g, "")});

      },
      errors => {
        console.log(errors);

      }
    )
  }

  searchMemorialCity(searchText: any) {
    
    if(searchText.form.value.searchText != ''){
    this.spiner.show();
    this.searchText = searchText.value.searchText;
    var searchCity = searchText.value.searchText;
    const formData2 = new FormData();
    formData2.append('search_text', searchCity)

    this.homeservice.get(formData2).subscribe((res: any) => {
      // JSON.parse(res);
      this.spiner.hide();

      this.dataSearch = res;
      this.dataSearch1 = res.Memorials;
      this.dataSearch2 = res.Memorials;


      this.dataSearch1.map(function (item) { return item.fname = item.fname.replace(/[^a-zA-Z-.]/g, "") });
      this.dataSearch1.map(function (item) { return item.lname = item.lname.replace(/[^a-zA-Z-.]/g, "") });

      console.log(res);
      
      if (res.Memorials.length > 0) {
        this.searchResult = true;
      }else {
        this.snackBar('Please enter valid Person Name or Location to search.', 'alert-danger');
        this.searchResult = false;

      }
    });
  }else{
    this.snackBar('Please enter Person Name or Location to search.', 'alert-danger');

  }
  }
  divHide() {
    
    this.searchResult = false;
    this.searchText ='';
  }
  seachByCityMemorial(data,data1){
    if (data) {
      this.recentService.userGrabIdData2 = data;
      this.recentService.userUserIdData = data1;

      this.router.navigate(['/visitor-mode']);
    }
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

  // Code for labels

  openDialogue(num): void {

    if (num == 1) {
      this.showNewDiv = 1;
      this.isvalid = true;
    } else if (num == 2) {
      this.showNewDiv = 2;
      this.isvalid = true;
    }else if (num == 3) {
      this.showNewDiv = 3;
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
      this.respo1 = this.respo[19];
      this.respo2 = this.respo[20];
      this.respo3 = this.respo[256];



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

  // For Visitor mode page
  recentMemorialGrabId(data, data1) {
    
    console.log(data);

    if (data) {
      this.recentService.userGrabIdData2 = data;
      this.recentService.userUserIdData = data1;

      this.router.navigate(['/visitor-mode']);
    }
  }


}
