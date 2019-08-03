import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface statusData {
  message: string,
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http:HttpClient) { }

  getLogoutStatus() {
    return this.http.get<statusData>('testApi/logout.php');
  }
}
