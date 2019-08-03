import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

interface myData {
  message: string,
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;

  constructor(private http: HttpClient) { }

  getUserDetails(uid, pass) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    console.log(uid, pass);
    return this.http.post<myData>('/testApi/auth.php',{uid, pass}, httpOptions);
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }
}
