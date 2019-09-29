import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { CategoriesObj as ResObj} from './../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(id:number) {
    const options = { params: new HttpParams().set('cid', id ? id.toString() : null) };
    return this.http.get<ResObj>(environment.apiURLs.getCategories,options)
  }

  addCategory(obj) {
    return this.http.post(environment.apiURLs.addCategory,obj);
  }

  editCategory(obj) {
    return this.http.post(environment.apiURLs.editCategory,obj);
  }

  deleteCategory(obj) {
    return this.http.post(environment.apiURLs.deleteCategory,obj);
  }
}
