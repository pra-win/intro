import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from './../services/categories.service';
import { FormGroup, FormControl } from '@angular/forms';

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

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesData:ResObj;
  showType = 'a';

  categoryForm = new FormGroup({
    cname: new FormControl('Category Name'),
    type: new FormControl('Category Type')
  });

  constructor(private categories: CategoriesService) { }

  ngOnInit() {
    this.categories.getCategories().subscribe(data => {
      console.log("data=",data);
      data.success && (this.categoriesData = data);
    });
  }

  showCategory(type) {
    this.showType = type;
  }

  addCategory(event) {
    event.preventDefault();
    let {cname, type} = this.categoryForm.value;
    let catObj = {cname, type};
    this.categoriesData.response.push(catObj);

    this.categories.addCategory(catObj)
                    .subscribe(data => {
                      console.log(data);
                    });
  }

}
