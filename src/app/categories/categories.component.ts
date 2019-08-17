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

  categoriesData = [];
  CATEGORY_TYPE = {A: '', I: 'i', E: 'e'};
  showType = this.CATEGORY_TYPE.A;

  categoryForm = new FormGroup({
    cname: new FormControl('Category Name'),
    type: new FormControl()
  });

  newData = [];

  constructor(private categories: CategoriesService, private modalService: BsModalService) { }

  ngOnInit() {
    this.categories.getCategories().subscribe(data => {
      data.success && (this.categoriesData = data.response);
      this.devideDataInChunk();
    });
  }

  devideDataInChunk() {
    this.newData = [];
    let filterData = this.categoriesData.filter((d) => {
                      return this.showType === this.CATEGORY_TYPE.A ? true : d.type === this.showType;
                    });
    let chunk = Math.ceil(filterData.length/4);
    let temparray = [];
    let i; let sliceCnt = 4;

    for(i = 0; i < filterData.length; i += sliceCnt) {
      temparray = filterData.slice(i,i + sliceCnt);
      this.newData.push(temparray);
    }

  }

  showCategory(type) {
    this.showType = type;
    this.devideDataInChunk();
  }

  addCategory(event) {
    event.preventDefault();
    this.modalRef.hide();
    let {cname, type} = this.categoryForm.value;
    let catObj = {cname, type};
    this.categories.addCategory(catObj)
                    .subscribe(data => {
                      console.log(data);
                      this.categoriesData.push(catObj);
                      this.devideDataInChunk();
                    });
  }

  openCategoryForm() {
    this.categoryForm.controls['type'].setValue(this.showType, {onlySelf: true});
    this.modalRef = this.modalService.show(this.input, this.config);
  }

}
