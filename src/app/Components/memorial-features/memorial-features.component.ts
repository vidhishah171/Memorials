import { Component, HostListener, OnInit } from '@angular/core';
import { AdminEditService } from 'src/services/admin-edit.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-memorial-features',
  templateUrl: './memorial-features.component.html',
  styleUrls: ['./memorial-features.component.css']
})
export class MemorialFeaturesComponent implements OnInit {
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
  respo9: any;
  respo10: any;
  isMobile: boolean = false;
  isTablet: boolean = false;
  featuredMemorialCaoruselLoop: any[] = [];
  memorialData: any[] = [
    {imgSrc: '../../../assets/StaticAssets/Home page/death.png', resp: this.respo2},
    {imgSrc: '../../../assets/StaticAssets/Home page/mesage.png', resp: this.respo3},
    {imgSrc: '../../../assets/StaticAssets/Home page/funeral (2).png', resp: this.respo4},
    {imgSrc: '../../../assets/StaticAssets/Home page/funeral (3).png', resp: this.respo5},
    {imgSrc: '../../../assets/StaticAssets/Home page/death (1).png', resp: this.respo6}
  ];

  constructor(
    public editservice: AdminEditService,
    public loginservice: LoginService,
  ) { }

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

    if(this.memorialData.length){
      this.featuredMemorialCaoruselLoop = [];
      let count = this.isMobile ? (this.memorialData.length/2) : this.isTablet ? this.memorialData.length/4 : 0;
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
      let count = this.isMobile ? (this.memorialData.length/2) : this.isTablet ? this.memorialData.length/4 : 0;
      for(let i=0;i<=Math.floor(count);i++){
        let tc = this.isMobile ? 2 : this.isTablet ? 4 : 5;
        this.featuredMemorialCaoruselLoop.push(this.memorialData.slice(i*tc,(i*tc + tc)));
      }
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
    }
  }
  openDialogue1() {
    this.isvalid = false;
  }

  editData() {
    this.editservice.adminEdit().subscribe((res: any) => {
      this.respo = res.Details;
      this.respo1 = this.respo[7]
      this.respo2 = this.respo[8]
      this.respo3 = this.respo[9]
      this.respo4 = this.respo[10]
      this.respo5 = this.respo[11]
      this.respo6 = this.respo[12]
      this.respo7 = this.respo[13]
      this.respo8 = this.respo[14]
      this.respo9 = this.respo[15]
      this.respo10 = this.respo[244];
      this.memorialData = [
        {imgSrc: '../../../assets/StaticAssets/Home page/death.png', resp: this.respo2},
        {imgSrc: '../../../assets/StaticAssets/Home page/mesage.png', resp: this.respo3},
        {imgSrc: '../../../assets/StaticAssets/Home page/funeral (2).png', resp: this.respo4},
        {imgSrc: '../../../assets/StaticAssets/Home page/funeral (3).png', resp: this.respo5},
        {imgSrc: '../../../assets/StaticAssets/Home page/death (1).png', resp: this.respo6}
      ];
      if(this.memorialData.length){
        this.featuredMemorialCaoruselLoop = [];
        let count = this.isMobile ? (this.memorialData.length/2) : this.isTablet ? this.memorialData.length/4 : 0;
        for(let i=0;i<=Math.floor(count);i++){
          let tc = this.isMobile ? 2 : this.isTablet ? 4 : 5;
          this.featuredMemorialCaoruselLoop.push(this.memorialData.slice(i*tc,(i*tc + tc)));
        }
      }
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
