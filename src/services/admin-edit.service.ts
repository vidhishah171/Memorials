import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminEditService {


  editApi="https://h2913228.stratoserver.net/API/public/pageLabel";
  editPostApi="https://h2913228.stratoserver.net/API/public/saveLabel";

  constructor(public http:HttpClient) { }
  saveLanguage:any;
  numLabel:any=[1];
  
  adminEdit(){
    return this.http.get(this.editApi);
  }

  editPostData(editData:any){
    return this.http.post(this.editPostApi,editData);
  }
}
