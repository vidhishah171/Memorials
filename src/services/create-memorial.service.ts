import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { async } from 'q';
import { createMemorial } from 'src/app/Model/createMemorial';
import { Observable } from 'rxjs';
import { memorialimage } from 'src/app/Model/memorialimage';


@Injectable({
  providedIn: 'root'
})
export class CreateMemorialService {

  getCreMemImgAPI="https://h2913228.stratoserver.net/API/public/grab_images";
  createNewMenAPI="http://127.0.0.1:8000/createMemorial";
  selectedMainImg:any;
  selectedMain:any;
  saveFormData:any;
  selectedVideo:any;
  saveCanvas:any;
  saveCanvas1:any;
  saveCanvas3:any;
  createMemorial:createMemorial=<createMemorial>{};
  memorialimage:memorialimage=<memorialimage>{};

  // headers:any;
  httpOptions = {
     headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'POST GET DELETE PUT',
          'Access-Control-Allow-Headers':'*',
     })
   }
  data: any;

  
  
  constructor(
    public http:HttpClient
  ) { }

  // step 1 Services

    getTambstoneImages(image_type_id:any){
     return this.http.post(this.getCreMemImgAPI,{image_type_id});
    }

    memCreatePostData(){ 
      var hh= this.createMemorial;
     // this.saveFormData = this.data;
      return this.http.post('https://h2913228.stratoserver.net/API/public/createMemorial',this.createMemorial);
    }


  // step 2 services

  getCanddleImages(image_type_id:any){
    return this.http.post(this.getCreMemImgAPI,{image_type_id});
   }

   getURNSImages(image_type_id:any){
    return this.http.post(this.getCreMemImgAPI,{image_type_id});
   }

  //  proxy config used hear
  getFlowerImages(image_type_id:any){
    return this.http.post('/flowerImages' ,{image_type_id},this.httpOptions);
    // return this.http.post(this.getCreMemImgAPI,{image_type_id});
  }

  getBackgImages(image_type_id:any){
    return this.http.post(this.getCreMemImgAPI,{image_type_id});
  }


  createNewMemorial(newMemData:any) {
    return this.http.post (this.createNewMenAPI,{newMemData})
  }

  //step 3 service

  memCreateImageData(result){
    return this.http.post('https://h2913228.stratoserver.net/API/public/memorial_image',result);
  }









































  //  getBackImages(image_type_id:any){
  //   //  this.headers = new Headers({
  //   //       'Content-Type': 'text/html',
  //   //      'Access-Control-Allow-Origin':'http://localhost:4800/',
  //   //      'Access-Control-Allow-Methods':'POST GET DELETE PUT',
  //   //      'Access-Control-Allow-Headers':'*',
  //   //      "mode": 'no-cors'


  //   //      });

      
   
  //    return this.http.post(this.getCreMemImgAPI,{image_type_id},{headers:new HttpHeaders({
  //     'Content-Type': 'html/json',
  //     "mode": 'no-cors'
  //    })});
     
     
  //  }

}
