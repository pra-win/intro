import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CategoriesObj {
    [index: number]: { cid: number; cname: string; type: string };
}

interface ResObj {
  message: string,
  success: boolean,
  response: [
    {cname: string, type:string}
  ]
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<ResObj>('/testApi/categories.php');
  }

  addCategory(obj) {
    return this.http.post('/testApi/addCategory.php',obj);
  }
}
