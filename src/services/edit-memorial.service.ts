import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditMemorialService {

  fetchVitaApi="https://h2913228.stratoserver.net/API/public/fetch_vita";
  memorialDetails="https://h2913228.stratoserver.net/API/public/memorialDetails";
  editMemorialApi="https://h2913228.stratoserver.net/API/public/editMemorial";

  lovedPersonData:any;

  constructor(
    private http:HttpClient
  ) { }




  fetchVita(result){
    return this.http.post(this.fetchVitaApi,result);
  }

  fetchJson(data){
    return this.http.post(this.memorialDetails,data);
  }

  SaveJsonFromEditMemorial(editData){
    return this.http.post(this.editMemorialApi,editData);
  }
}
