import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  userApi="https://h2913228.stratoserver.net/API/public/update_profile";
  userProfileApi="https://h2913228.stratoserver.net/API/public/user_created_memorial";
  myProfile="https://h2913228.stratoserver.net/API/public/user_profile";
  getMemorialDetailsApi="https://h2913228.stratoserver.net/API/public/memorialDetails";


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

  myProfileDetails(profileDetails){
    
    // For server
    return this.http.post(this.myProfile,profileDetails);
    

    // For Local
    // return this.http.post('/userProfile',profileDetails);
  }

  getMemorialDetails(grabId){
    
    return this.http.post(this.getMemorialDetailsApi,grabId)
  }

}
