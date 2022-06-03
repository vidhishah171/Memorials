import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  userApi="https://h2913228.stratoserver.net/API/public/update_profile";
  userProfileApi="https://h2913228.stratoserver.net/API/public/user_created_memorial";
  myProfile="https://h2913228.stratoserver.net/API/public/user_profile";
  getMemorialDetailsApi="https://h2913228.stratoserver.net/API/public/memorialDetails";
  saveCondoAPI="https://h2913228.stratoserver.net/API/public/create_kondolenz";
  CondoAPIDelete="https://h2913228.stratoserver.net/API/public/delete_kondolenz";

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

  saveCondo(condoData){
    debugger
    return this.http.post(this.saveCondoAPI,condoData)
  }

  deleteCondo(condoId:any){
    debugger;
    // for server
    return this.http.delete(this.CondoAPIDelete,condoId);

    // for local
    // return this.http.post('/delete_kondolenz',condoId);
  }

}
