import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { UserProfileService } from './user-profile.service';

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
  memorialDetails:any;
index=1;
indexNew=1;
  memorialDetails1: any;

  constructor(
    private http : HttpClient,
    public profileService: UserProfileService,

  ) {}


  getRecentmemorials=()=>{
    return this.http.get(this.recentMemorialAPI);
  }

  getPremiumMemorials=()=>{
    return this.http.get(this.premiumMemorialAPI);
  }


  getMeorialDetail() {
    debugger
    var data = { "grab_id": this.userGrabIdData2 }
    this.profileService.getMemorialDetails(data).subscribe((response: any) => {
      this.memorialDetails1 = response.Details[0].comments;
      this.memorialDetails = this.memorialDetails1.slice(0,8).reverse();
      for (let item of this.memorialDetails) {
        if (item.firstname != null) {
          item.firstname = item.firstname.replace(/[^a-zA-Z-.]/g, "");
        } else {
          item.firstname = '';
        } 
        if (item.lastname != null) {
          item.lastname = item.lastname.replace(/[^a-zA-Z-.]/g, "");
        }else{
          item.lastname = '';
        }
        if(item.created != null){
          item.created = formatDate(item.created, "M/d/yyyy 'at' h:mm aa", 'en_US');
        }else{
          item.created = '';
        }
      }

      // this.memorialDetails.map(function (item) { return item.fname = item.created.replace(/[^a-zA-Z-.]/g, "") });
      // this.service.createMemorial.DOB = formatDate(this.service.createMemorial.DOB, 'yyyy-M-d h:mm:ss', 'en_US');

    })
  }

  readAllCondo(){
    
    this.memorialDetails = this.memorialDetails1.slice().reverse();
  }
  


}
