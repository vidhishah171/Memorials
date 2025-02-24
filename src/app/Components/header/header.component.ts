import { Options } from '@angular-slider/ngx-slider';
import { formatDate } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit, AfterViewInit {
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
  userMemorialData: any;
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
  respo9: any;
  respo10: any;
  respo11: any;
  respo12: any;
  respo13: any;
  respo14: any;
  respo15: any;
  respo16: any;
  isMobile: boolean = false;
  isTablet: boolean = false;
  featuredMemorialCaoruselLoop: any[] = [];

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
    this.isMobile = false;
    this.isTablet = false;
    if(window.innerWidth > 1400){
      this.isMobile = false;
      this.isTablet = false;
    }
    else if (window.innerWidth > 1000 && window.innerWidth < 1400) {
      this.isMobile = false;
      this.isTablet = true;
    }
    else if (window.innerWidth <= 1000) {
      this.isTablet = false;
      this.isMobile = true;
    }
  }

  ngAfterViewInit(){
    this.isMobile = false;
    this.isTablet = false;
    if(window.innerWidth > 1400){
      this.isMobile = false;
      this.isTablet = false;
    }
    else if (window.innerWidth > 1000 && window.innerWidth < 1400) {
      this.isMobile = false;
      this.isTablet = true;
    }
    else if (window.innerWidth <= 1000) {
      this.isTablet = false;
      this.isMobile = true;
    }

    // this.userMemorialData = this.isMobile ? this.memorialData.slice(0,2) : this.isTablet ? this.memorialData.slice(0,4) : this.memorialData.slice(0,5);
    if(this.memorialData.length){
      this.featuredMemorialCaoruselLoop = [];
      this.userMemorialData = this.isMobile ? this.memorialData.slice(0,2) : this.isTablet ? this.memorialData.slice(0,4) : this.memorialData.slice(0,5);
      let count = this.isMobile ? (this.memorialData.length/2) : this.isTablet ? this.memorialData.length/4 : this.memorialData.length/5;
      for(let i=0;i<=Math.floor(count);i++){
        let tc = this.isMobile ? 2 : this.isTablet ? 4 : 5;
        this.featuredMemorialCaoruselLoop.push(this.memorialData.slice(i*tc,(i*tc + tc)));
      }
    }
    
    
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(){
    this.isMobile = false;
    this.isTablet = false;
    if(window.innerWidth > 1400){
      this.isMobile = false;
      this.isTablet = false;
    }
    else if (window.innerWidth > 1000 && window.innerWidth < 1400) {
      this.isMobile = false;
      this.isTablet = true;
    }
    else if (window.innerWidth <= 1000) {
      this.isTablet = false;
      this.isMobile = true;
    }

    // this.userMemorialData = this.isMobile ? this.memorialData.slice(0,2) : this.isTablet ? this.memorialData.slice(0,4) : this.memorialData.slice(0,5);
    if(this.memorialData.length){
      this.featuredMemorialCaoruselLoop = [];
      this.userMemorialData = this.isMobile ? this.memorialData.slice(0,2) : this.isTablet ? this.memorialData.slice(0,4) : this.memorialData.slice(0,5);
      let count = this.isMobile ? (this.memorialData.length/2) : this.isTablet ? this.memorialData.length/4 : this.memorialData.length/5;
      for(let i=0;i<=Math.floor(count);i++){
        let tc = this.isMobile ? 2 : this.isTablet ? 4 : 5;
        this.featuredMemorialCaoruselLoop.push(this.memorialData.slice(i*tc,(i*tc + tc)));
      }
    }

  }

  divHide() {
    this.searchText = "";
    this.searchResult = false;
  }

  prevFeaturedMemorial(){

  }

  nextFeaturedMemorial(){

  }

  searchMemorialCity(searchText: any) {
    if (searchText.form.value.searchText != '') {
      this.spiner.show();
      this.searchText = searchText.value.searchText;
      var searchCity = searchText.value.searchText;
      const formData2 = new FormData();
      formData2.append('search_text', searchCity)
      this.homeservice.get(formData2).subscribe((res: any) => {
        this.spiner.hide();
        this.dataSearch = res;
        this.dataSearch1 = res.Memorials;
        this.dataSearch2 = res.Memorials;
        this.dataSearch1.map(function (item) { return item.fname = item.fname.replace(/[^a-zA-Z-.]/g, "") });
        this.dataSearch1.map(function (item) { return item.lname = item.lname.replace(/[^a-zA-Z-.]/g, "") });
        if (res.Memorials.length > 0) {
          this.searchResult = true;
        } else {
          this.snackBar('Please enter valid Person Name or Location to search.', 'alert-danger');
          this.searchResult = false;
        }
      });
    } else {
      this.snackBar('Please enter Person Name or Location to search.', 'alert-danger');
    }
  }
  dataBirtMin: any = 1880;
  dataBirtmax: any = 2022;
  dataMin: any = 0;
  dataMax: any = 150;
  newEvent() {
    this.dataSearch2 = this.dataSearch1.filter(ageSearch => ageSearch.age >= this.dataMin && ageSearch.age <= this.dataMax && this.dataBirtMin <= Number(ageSearch.birthdate.split('.')[2]) && this.dataBirtmax >= Number(ageSearch.birthdate.split('.')[2]));
    this.dateSlider = '';
    this.dateSlider1 = '';
    this.userBirthLocation = "";
    this.userDeathLocation = "";
  }
  getEvent(data) {
    if (data != '') {
      this.dataMin = data.value;
      this.dataMax = data.highValue;
      this.newEvent();
    } else {
      this.searchMemorialCity1();
    }
  }
  getEvent1(dataBirt) {
    if (dataBirt != '') {
      this.dataBirtMin = dataBirt.value;
      this.dataBirtmax = dataBirt.highValue;
      this.newEvent();
    } else {
      this.searchMemorialCity1();
    }
  }
  getEvent2(birthDate) {
    if (birthDate != '') {
      var birthdate = formatDate(birthDate, 'dd.MM.yyyy', 'en_US');
      this.dataSearch2 = this.dataSearch1.filter(dateSearch => dateSearch.birthdate === birthdate);
      this.dateSlider1 = '';
      this.userBirthLocation = "";
      this.userDeathLocation = "";
    } else {
      this.searchMemorialCity1();
    }
  }
  getEvent3(deathDate) {
    if (deathDate != '') {
      var deathdate = formatDate(deathDate, 'dd.MM.yyyy', 'en_US');
      this.dataSearch2 = this.dataSearch1.filter(dateSearch => dateSearch.deathdate === deathdate);
      this.dateSlider = '';
      this.userBirthLocation = "";
      this.userDeathLocation = "";
    } else {
      this.searchMemorialCity1();
    }
  }
  getEvent4(birthLocation) {
    if (birthLocation != '') {
      this.dataSearch2 = this.dataSearch1.filter(dateSearch => dateSearch.birthtown === birthLocation);
      this.dateSlider = '';
      this.dateSlider1 = '';
      this.userDeathLocation = "";
    } else {
      this.searchMemorialCity1();
    }
  }
  getEvent5(deathLocation) {
    if (deathLocation != '') {
      this.dataSearch2 = this.dataSearch1.filter(dateSearch => dateSearch.starvetown === deathLocation);
      this.dateSlider = '';
      this.dateSlider1 = '';
      this.userBirthLocation = "";
    } else {
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
  seachByCityMemorial(data, data1) {
    if (data) {
      this.service.userGrabIdData2 = data;
      this.service.userUserIdData = data1;
      this.router.navigate(['/visitor-mode']);
      const jsonData = JSON.stringify(data)
      localStorage.setItem('myData1', jsonData)
      const jsonDataNew = JSON.stringify(data1)
      localStorage.setItem('myData2', jsonDataNew)
    }
  }
  //featured memorial
  getMemorials() {
    this.featureService.getMemorials().subscribe(
      (memorial: any) => {
        this.memorialData = memorial.Memorials;
        this.featuredMemorialCaoruselLoop = [];
        this.userMemorialData = this.isMobile ? this.memorialData.slice(0,2) : this.isTablet ? this.memorialData.slice(0,4) : this.memorialData.slice(0,5);
        let count = this.isMobile ? (this.memorialData.length/2) : this.isTablet ? this.memorialData.length/4 : this.memorialData.length/5;
        for(let i=0;i<=Math.floor(count);i++){
          let tc = this.isMobile ? 2 : this.isTablet ? 4 : 5;
          this.featuredMemorialCaoruselLoop.push(this.memorialData.slice(i*tc,(i*tc + tc)));
        }
      },
      error => {
        return error;
      })
  }
  // for visitor mode page
  recentMemorialGrabId(data, data1) {
    if (data) {
      this.service.userGrabIdData2 = data;
      this.service.userUserIdData = data1;
      this.router.navigate(['/visitor-mode']);
      const jsonData = JSON.stringify(data)
      localStorage.setItem('myData1', jsonData)
      const jsonDataNew = JSON.stringify(data1)
      localStorage.setItem('myData2', jsonDataNew)
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
    } else if (num == 9) {
      this.showNewDiv = 9;
      this.isvalid = true;
    } else if (num == 10) {
      this.showNewDiv = 10;
      this.isvalid = true;
    } else if (num == 11) {
      this.showNewDiv = 11;
      this.isvalid = true;
    } else if (num == 12) {
      this.showNewDiv = 12;
      this.isvalid = true;
    } else if (num == 13) {
      this.showNewDiv = 13;
      this.isvalid = true;
    } else if (num == 14) {
      this.showNewDiv = 14;
      this.isvalid = true;
    } else if (num == 15) {
      this.showNewDiv = 15;
      this.isvalid = true;
    } else if (num == 16) {
      this.showNewDiv = 16;
      this.isvalid = true;
    }
  }
  openDialogue1() {
    this.isvalid = false;
  }
  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      this.respo = res.Details;
      this.respo1 = this.respo[3];
      this.respo2 = this.respo[0];
      this.respo3 = this.respo[1];
      this.respo4 = this.respo[2];
      this.respo5 = this.respo[4];
      this.respo6 = this.respo[5];
      this.respo7 = this.respo[2];
      this.respo8 = this.respo[243];
      this.respo9 = this.respo[255];
      this.respo10 = this.respo[262];
      this.respo11 = this.respo[263];
      this.respo12 = this.respo[264];
      this.respo13 = this.respo[265];
      this.respo14 = this.respo[266];
      this.respo15 = this.respo[267];
      this.respo16 = this.respo[268];
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
