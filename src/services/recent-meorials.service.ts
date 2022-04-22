import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecentMeorialsService {

  recentMemorialAPI="https://h2913228.stratoserver.net/API/public/recent_memorial";

  premiumMemorialAPI="https://h2913228.stratoserver.net/API/public/premium_memorial";

  userGrabIdData:any;
  userGrabIdData1:any;
  userGrabIdData2:any;
  userUserIdData:any;

index=1;
indexNew=1;

  constructor(
    private http : HttpClient
  ) {}


  getRecentmemorials=()=>{
    return this.http.get(this.recentMemorialAPI);
  }

  getPremiumMemorials=()=>{
    return this.http.get(this.premiumMemorialAPI);
  }

  


}
