import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { async } from 'q';
import { createMemorial } from 'src/app/Model/createMemorial';
import { Observable } from 'rxjs';
import { memorialimage } from 'src/app/Model/memorialimage';
import { vita } from 'src/app/Model/vita';
import { formatDate } from '@angular/common';


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
  ImgRandomId:any;
  saveVitaText:any;
  stepNumber:any;

  createMemorial:createMemorial=<createMemorial>{};
  memorialimage:memorialimage=<memorialimage>{};
  // vita:vita=<vita>{}
  vita:vita=<vita>{};

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
      this.createMemorial.DOB=formatDate(this.createMemorial.DOB,'yyyy-M-d h:mm:ss','en_US');
      this.createMemorial.DOD=formatDate(this.createMemorial.DOD,'yyyy-M-d h:mm:ss','en_US');

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
    //For local
    // return this.http.post('/flowerImages' ,{image_type_id},this.httpOptions);
    
    //For server
    return this.http.post(this.getCreMemImgAPI,{image_type_id});
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

 createvitaMemorial(result1){
  return this.http.post('https://h2913228.stratoserver.net/API/public/vita_upload',result1);
 }

 createMemorialJson(jsonData){
   return this.http.post('https://h2913228.stratoserver.net/API/public/editMemorial',jsonData);
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
