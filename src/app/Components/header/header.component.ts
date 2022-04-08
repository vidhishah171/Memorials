import { Options } from '@angular-slider/ngx-slider';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { AdminEditService } from 'src/services/admin-edit.service';
import { FearturedMemorialService } from 'src/services/feartured-memorial.service';
import { HomeService } from 'src/services/home.service';
import { LoginService } from 'src/services/login.service';
import { RecentMeorialsService } from 'src/services/recent-meorials.service';
import { AdminEditPopupComponent } from '../admin-edit/admin-edit-popup/admin-edit-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  value: number = 0;
  highValue: number = 150;
  options: Options = {
    floor: 0,
    ceil: 150
  };
  value1: number = 1880;
  highValue1: number = 2022;
  options1: Options = {
    floor: 1880,
    ceil: 2022
  };




  // formatLabel(value: number) {
  //   if (value >= 1000) {
  //     return Math.round(value / 1000) + ' y';
  //   }

  // return value;
  // }


  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  ageSearch: any = '';

  sliderValue: number = 0;
  dateSlider: string;
  dateSlider1: string;
  userBirthLocation: any;
  userDeathLocation: any;



  searchText: any;
  dataSearch: any;
  memorialData: any;
  searchResult: boolean = false;
  dataSearch1: any;
  respo: any;
  respo1: any;
  isvalid: boolean;
  showNewDiv: number;
  showLabel: any;
  respo2: any;
  respo3: any;
  respo4: any;
  respo5: any;
  respo6: any;
  respo7: any;
  respo8: any;
  dataSearch2: any;

  maxDate = new Date();


  constructor(
    public homeservice: HomeService,
    public featureService: FearturedMemorialService,
    public dialog: MatDialog,
    public editservice: AdminEditService,
    public loginservice: LoginService,
    private service: RecentMeorialsService,
    private router: Router,
    public snack: MatSnackBar,
    private spiner: NgxSpinnerService,


  ) { }

  ngOnInit(): void {
    this.getMemorials();
    this.editData();
  }


  divHide() {
    
    this.searchText = "";
    this.searchResult = false;
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
  // value: number = 0;
  // highValue: number = 100;
  // options: Options = {
  //   floor: 0,
  //   ceil: 100
  // };
  // value1: number = 1920;
  // highValue1: number = 2022;

  getEvent(data) {
    if(data != ''){
    this.dataSearch2 = this.dataSearch1.filter(ageSearch => ageSearch.age >= data.value && ageSearch.age <= data.highValue);
    this.value1 = 1880;
    this.highValue1 = 2022;
    this.dateSlider = '';
    this.dateSlider1 = '';
    this.userBirthLocation = "";
    this.userDeathLocation = "";
  }else{
    this.searchMemorialCity1();
  }
  }
  getEvent1(dataBirt) {
    
    if(dataBirt != ''){
    this.dataSearch2 = this.dataSearch1.filter(item => dataBirt.value <= Number(item.birthdate.split('.')[2]) && dataBirt.highValue >= Number(item.birthdate.split('.')[2]))
     this.value = 0;
    this.highValue = 150;
    this.dateSlider = '';
    this.dateSlider1 = '';
    this.userBirthLocation = "";
    this.userDeathLocation = "";
  }else{
    this.searchMemorialCity1();
  }
  }
  getEvent2(birthDate) {
    
    if(birthDate != ''){
    var birthdate = formatDate(birthDate, 'dd.MM.yyyy', 'en_US');

    this.dataSearch2 = this.dataSearch1.filter(dateSearch => dateSearch.birthdate === birthdate);
    this.value = 0;
    this.highValue = 150;
    this.value1 = 1880;
    this.highValue1 = 2022;
    this.dateSlider1 = '';
    this.userBirthLocation = "";
    this.userDeathLocation = "";
  }else{
    this.searchMemorialCity1();
  }
  }
  getEvent3(deathDate) {
    
    if(deathDate != ''){
    var deathdate = formatDate(deathDate, 'dd.MM.yyyy', 'en_US');

    this.dataSearch2 = this.dataSearch1.filter(dateSearch => dateSearch.deathdate === deathdate);
    this.value = 0;
    this.highValue = 150;
    this.value1 = 1880;
    this.highValue1 = 2022;
    this.dateSlider = '';
    // this.dateSlider1 = '';
    this.userBirthLocation = "";
    this.userDeathLocation = "";
  }else{
    this.searchMemorialCity1();
  }
  }
  getEvent4(birthLocation) {
    
    if(birthLocation != ''){
    this.dataSearch2 = this.dataSearch1.filter(dateSearch => dateSearch.birthtown === birthLocation);
    this.value = 0;
    this.highValue = 150;
    this.value1 = 1880;
    this.highValue1 = 2022;
    this.dateSlider = '';
    this.dateSlider1 = '';
    this.userDeathLocation = "";
  }else{
    this.searchMemorialCity1();
  }
  }
  getEvent5(deathLocation) {
    
    if(deathLocation != ''){
    this.dataSearch2 = this.dataSearch1.filter(dateSearch => dateSearch.starvetown === deathLocation);
    this.value = 0;
    this.highValue = 150;
    this.value1 = 1880;
    this.highValue1 = 2022;
    this.dateSlider = '';
    this.dateSlider1 = '';
    this.userBirthLocation = "";
  }else{
    this.searchMemorialCity1();
  }
  }

  searchMemorialCity1() {
    
    const formData2 = new FormData();
    formData2.append('search_text', this.searchText)

    this.homeservice.get(formData2).subscribe((res: any) => {
      this.dataSearch = res;
      this.dataSearch1 = res.Memorials;
      this.dataSearch2 = res.Memorials;

      this.dataSearch1.map(function (item) { return item.fname = item.fname.replace(/[^a-zA-Z-.]/g, "") });
      this.dataSearch1.map(function (item) { return item.lname = item.lname.replace(/[^a-zA-Z-.]/g, "") });
    
    })
  }

  seachByCityMemorial(data,data1){
    if (data) {
      this.service.userGrabIdData2 = data;
      this.service.userUserIdData = data1;

      this.router.navigate(['/visitor-mode']);
    }
  }

  //featured memorial

  getMemorials() {
    this.featureService.getMemorials().subscribe(
      (memorial: any) => {
        this.memorialData = memorial.Memorials;
      },
      error => {
        return error;
      })
  }

  // for visitor mode page
  recentMemorialGrabId(data, data1) {
    
    console.log(data);

    if (data) {
      this.service.userGrabIdData2 = data;
      this.service.userUserIdData = data1;

      this.router.navigate(['/visitor-mode']);
    }
  }



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
      this.respo1 = this.respo[3];
      this.respo2 = this.respo[0];
      this.respo3 = this.respo[1];
      this.respo4 = this.respo[2];
      this.respo5 = this.respo[4];
      this.respo6 = this.respo[5];
      this.respo7 = this.respo[2];
      this.respo8 = this.respo[243];


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
