import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CategoriesObj as ResObj} from './../interfaces';

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
