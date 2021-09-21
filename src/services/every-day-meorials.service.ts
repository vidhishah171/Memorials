import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EveryDayMeorialsService {

  getEverydayMemorialAPI="https://h2913228.stratoserver.net/API/public/todayCommemorate";

  constructor(
    private http : HttpClient
  ) { }


  getEverydayMemorial(){
    return this.http.get(this.getEverydayMemorialAPI);
  }

}
