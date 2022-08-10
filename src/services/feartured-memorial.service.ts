import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class FearturedMemorialService {

  constructor(private http: HttpClient) { }

  featureMemorialAPI = "https://h2913228.stratoserver.net/API/public/featuredMemorial";

  getMemorials = () => {
    return this.http.get(this.featureMemorialAPI);
  }

}
