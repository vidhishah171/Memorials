import { Component, HostListener, OnInit } from '@angular/core';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-grief',
  templateUrl: './grief.component.html',
  styleUrls: ['./grief.component.css']
})
export class GriefComponent implements OnInit {
  showNewDiv: number;
  isvalid: boolean;
  respo: any;
  respo1: any;
  respo2: any;
  respo3: any;
  respo4: any;

  isMobile: boolean = false;
  isTablet: boolean = false;
  featuredMemorialCaoruselLoop: any[] = [];
  memorialData: any[] = [
    {date: '17-01-2019', text: 'How to get good custom dissertation writing service'},
    {date: '18-02-2020', text: 'What to get worst custom dome service'},
    {date: '19-03-2021', text: 'Why to get best custom noveling service'},
    {date: '20-04-2022', text: 'How to get normal custom reading service'}
  ];


  constructor(
    public editservice: AdminEditService,
    public loginservice: LoginService,
  ) { }

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
    if(this.memorialData.length){
      this.featuredMemorialCaoruselLoop = [];
      let count = this.isMobile ? 3 : this.isTablet ? 1 : 0;
      for(let i=0;i<=Math.floor(count);i++){
        let tc = this.isMobile ? 1 : this.isTablet ? 2 : 4;
        this.featuredMemorialCaoruselLoop.push(this.memorialData.slice(i*tc,(i*tc + tc)));
      }
    }
  }
  
  ngOnInit(): void {
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

    if(this.memorialData.length){
      this.featuredMemorialCaoruselLoop = [];
      let count = this.isMobile ? (this.memorialData.length/1) : this.isTablet ? this.memorialData.length/2 : 0;
      for(let i=0;i<=Math.floor(count);i++){
        let tc = this.isMobile ? 1 : this.isTablet ? 2 : 4;
        this.featuredMemorialCaoruselLoop.push(this.memorialData.slice(i*tc,(i*tc + tc)));
      }
    }
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
    }
  }
  openDialogue1() {
    this.isvalid = false;
  }
  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      this.respo = res.Details;
      this.respo1 = this.respo[26]
      this.respo2 = this.respo[2]
      this.respo3 = this.respo[28]
      this.respo4 = this.respo[148];
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
