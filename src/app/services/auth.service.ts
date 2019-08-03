import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) { }

  getUserDetails(uid, pass) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    console.log(uid, pass);
    return this.http.post<Object>('/testApi/auth.php',{uid, pass}, httpOptions);              
  }
}
