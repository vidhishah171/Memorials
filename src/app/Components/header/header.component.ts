import { Component, OnInit } from '@angular/core';
import { FearturedMemorialService } from 'src/services/feartured-memorial.service';
import { HomeService } from 'src/services/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // formatLabel(value: number) {
  //   if (value >= 1000) {
  //     return Math.round(value / 1000) + ' y';
  //   }

    // return value;
  // }


  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  ageSearch:any='';

  sliderValue: number = 0;

  searchText:any;
  dataSearch: any;
  memorialData:any;
  searchResult:boolean=false;
  dataSearch1: any;

  constructor(
    public homeservice:HomeService,
    public featureService : FearturedMemorialService

  ) { }

  ngOnInit(): void {
    this.getMemorials()
  }

   

  searchMemorialCity(searchText:any){
    debugger;
    var searchCity=searchText.value.searchText;
    const formData2=new FormData();
    formData2.append('search_text',searchCity)

    this.homeservice.get(formData2).subscribe((res:any)=>{
      // JSON.parse(res);
      this.dataSearch = res;
      this.dataSearch1=res.Memorials;

     console.log(res);

     if(res.Memorials === ''){
       this.searchResult=true;
     }else{
       this.searchResult=true;
     }
    })
  }

  //featured memorial

  getMemorials(){
    this.featureService.getMemorials().subscribe(
    (memorial:any)=>{
     this.memorialData= memorial.Memorials;      
    },
    error=>{
      return error;
    }
  )
}

}
