import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { CategoriesObj as ResObj} from './../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories() {
    console.log(environment);
    return this.http.get<ResObj>(environment.apiURLs.getCategories);
  }

  addCategory(obj) {
    return this.http.post(environment.apiURLs.addCategory,obj);
  }
}
