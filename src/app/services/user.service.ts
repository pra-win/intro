import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

interface myData{
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUserData() {
    return this.http.get<myData>('testApi/dataBase.php');
  }
}
