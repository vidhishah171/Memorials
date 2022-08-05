import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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
  inviteUser="https://h2913228.stratoserver.net/API/public/getAllUsersList";
  userInvitationAPI="https://h2913228.stratoserver.net/API/public/invitationSend";
  userDetailAPi = "https://h2913228.stratoserver.net/API/public/userDetails";
  insertBackground = "https://h2913228.stratoserver.net/API/public/insert_decoration";
  updateBackground = "https://h2913228.stratoserver.net/API/public/update_decoration";
  deleteBackground = "https://h2913228.stratoserver.net/API/public/delete_decoration";
  fetchBackground = "https://h2913228.stratoserver.net/API/public/fetch_decoration";
  receiveMessageAPI = "https://h2913228.stratoserver.net/API/public/message_receive_users";
  receiveMessagesOnlyAPI = "https://h2913228.stratoserver.net/API/public/message_receive"

  userDetail:any;
  userDetailUserId:any;
  userDetailId:any;
  senderUserId:any;


  constructor(
    private http:HttpClient
  ) { }



  userProfile(profileData:any){
    return this.http.post(this.userApi,profileData);
  }

  userCreatedMemorial=(userDetail:any)=>{
    
    return this.http.post(this.userProfileApi,userDetail);
  }

  getMemorialDetails(grabId){
    
    return this.http.post(this.getMemorialDetailsApi,grabId)
  }

  saveCondo(condoData){
    return this.http.post(this.saveCondoAPI,condoData)
  }

  inviteUserListData(){
    return this.http.get(this.inviteUser);
  }

  sendInvitationUser(userEmailId){
    return this.http.post(this.userInvitationAPI,userEmailId)
  }

  uploadMyBackground(uploadBackData){
    debugger
    return this.http.post(this.insertBackground,uploadBackData);
  }

  updateMyBackground(updateBackData){
    return this.http.post(this.updateBackground,updateBackData);
  }

  deleteMyBackground(deleteData){
    return this.http.post(this.deleteBackground,deleteData);
  }

  fetchMyBackground(fetchData){

    // for server
    // return this.http.post(this.fetchBackground,fetchData);

    // for local
    return this.http.post('/insertDecoration',fetchData);

  }

  myProfileDetails(profileDetails){
    
    // For server
    // return this.http.post(this.myProfile,profileDetails);
    

    // For Local
    return this.http.post('/userProfile',profileDetails);
  }

  deleteCondo(condoId:any){
    // for server
    // return this.http.post(this.CondoAPIDelete,condoId);

    // for local
    return this.http.post('/delete_kondolenz',condoId);
  }

  userProfileDetails(userId){
    // for server
    // return this.http.post(this.userDetailAPi,userId);

    // for local
    return this.http.post('/userDetail',userId);
  }

  receiveMessageDetails(receiveMessageId){
    debugger
    return this.http.post(this.receiveMessageAPI,receiveMessageId);
  }

  receiveMessagesOnly(receiveMessageData){
    debugger
    return this.http.post(this.receiveMessagesOnlyAPI,receiveMessageData)
  }
}
