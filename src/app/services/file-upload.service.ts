import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  percentDone: number;
  uploadSuccess: boolean;

  constructor(private httpClient: HttpClient) { }

  public uploadFile(data: any, url: string) {
    return this.httpClient.post<any>(url, data);
  }

}