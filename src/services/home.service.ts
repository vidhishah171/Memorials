import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  searchApi="https://h2913228.stratoserver.net/API/public/search_memorial";

  constructor(
    private http:HttpClient
  ) { }

  
   get(result2){
     debugger
     return this.http.post("https://h2913228.stratoserver.net/API/public/search_memorial",result2);
   }
}
