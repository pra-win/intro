import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from './../services/categories.service';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CategoriesObj as ResObj} from './../interfaces';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @ViewChild('template', {static: false}) input;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  categoriesData:ResObj;
  CATEGORY_TYPE = {A: '', I: 'i', E: 'e'};
  showType = this.CATEGORY_TYPE.A;

  categoryForm = new FormGroup({
    cname: new FormControl('Category Name'),
    type: new FormControl()
  });

  constructor(private categories: CategoriesService, private modalService: BsModalService) { }

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

  openCategoryForm() {
    this.categoryForm.controls['type'].setValue(this.showType, {onlySelf: true});
    this.modalRef = this.modalService.show(this.input, this.config);
  }

}
