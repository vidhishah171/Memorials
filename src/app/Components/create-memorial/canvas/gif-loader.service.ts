import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { fabric } from 'fabric';
@Injectable({
  providedIn: 'root'
})
export class GifLoaderService {

  constructor(
    private http: HttpClient
  ) { }

  loadGifFromUrl(url: string): Observable<any> {
    return new Observable<any>(observer => {
      this.http.get(url, { responseType: 'blob', headers:  this.httpOptions.headers}).pipe(
        catchError(error => {
          observer.error('Error fetching GIF: ' + error);
          return throwError(error);
        })
      ).subscribe((blob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const fabricImg = new fabric.Image(dataUrl);
          observer.next(blob);
          observer.complete();
        };
        reader.readAsDataURL(blob);
      });
    });
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST GET DELETE PUT',
      'Access-Control-Allow-Headers': '*',
    })
  }
}
