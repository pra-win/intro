import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

interface statusData {
  message: string,
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http:HttpClient, private router:Router, private auth:AuthService) { }

  getLogoutStatus() {
    this.http.get<statusData>(environment.apiURLs.logout)
                .subscribe(data => {
                  if(data.success) {
                    this.auth.setLoggedIn(false);
                    this.router.navigate(['/login']);
                  }
                });;
  }
}
