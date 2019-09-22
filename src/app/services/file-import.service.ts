import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileImportService {

  constructor(private httpClient: HttpClient) { }
  
  public importFile(data, url:string) {
    return this.httpClient.post<any>(url, data);
  }
}
