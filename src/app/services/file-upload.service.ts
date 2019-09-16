import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  percentDone: number;
  uploadSuccess: boolean;

  constructor(private httpClient: HttpClient) { }

  public uploadFile(data) {
    let uploadURL = environment.apiURLs.fileUpladTest;
    return this.httpClient.post<any>(uploadURL, data);
  }

}
