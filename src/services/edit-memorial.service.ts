import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditMemorialService {

  fetchVitaApi="https://h2913228.stratoserver.net/API/public/fetch_vita";
  vitaUploadAPI="https://h2913228.stratoserver.net/API/public/vita_upload";
  memorialDetails="https://h2913228.stratoserver.net/API/public/memorialDetails";
  editMemorialApi="https://h2913228.stratoserver.net/API/public/editMemorial";
  photoAPI="https://h2913228.stratoserver.net/API/public/imgUpload";
  photoAPI1="https://h2913228.stratoserver.net/API/public/getImages";
  deleteAPI = "https://h2913228.stratoserver.net/API/public/delete_media";
  updatePhotoVideoGalleryAPI= "https://h2913228.stratoserver.net/API/public/update_media";

  lovedPersonData:any;
  getPhotoVideoImageId:any[]=[];

  constructor(
    private http:HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin':'*',
         'Access-Control-Allow-Methods':'POST DELETE PUT GET',
         'Access-Control-Allow-Headers':'*',
    })
  }



  fetchVita(result){
    return this.http.post(this.fetchVitaApi,result);
  }
  vitaUpload(result1){
    return this.http.post(this.vitaUploadAPI,result1);
  }

  fetchJson(data){
    return this.http.post(this.memorialDetails,data);
  }

  SaveJsonFromEditMemorial(editData){
    return this.http.post(this.editMemorialApi,editData);
  }

  photoVideo(photoData){
    return this.http.post(this.photoAPI,photoData);
  }

  getPhotoVideoDelete(deleteId){
    return this.http.post(this.deleteAPI,deleteId);

  }

  getPhotoVideo(photoData1){
  
    // For server
    return this.http.post(this.photoAPI1,photoData1);

    // For local
    // return this.http.post('/getImage',photoData1);
  }
  updatePhotoVideoGallery(photoVideoGalleryDetails){
    return this.http.post(this.updatePhotoVideoGalleryAPI,photoVideoGalleryDetails);
  }
}
