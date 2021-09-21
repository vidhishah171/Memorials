import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MostVisitedService {

  getMostVisMemorialAPI="https://h2913228.stratoserver.net/API/public/mostVisited_memorial";

  constructor(
    private http : HttpClient
  ){ }


  getMostVisMemorial=()=>{
    return this.http.get(this.getMostVisMemorialAPI);
  }


}
