import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  userApi="https://h2913228.stratoserver.net/API/public/update_profile";
  userProfileApi="https://h2913228.stratoserver.net/API/public/user_created_memorial";


  userDetail:any;
  userDetailUserId:any;

  constructor(
    private http:HttpClient
  ) { }



  userProfile(profileData:any){
    return this.http.post(this.userApi,profileData);
  }

  userCreatedMemorial=(userDetail:any)=>{
    return this.http.post(this.userProfileApi,userDetail);
  }



}
