import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from './../services/categories.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';


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

  newData = [];

  constructor(
      private categories: CategoriesService, 
      private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories.getCategories().subscribe(data => {
      data.success && (this.categoriesData = data.response);
      this.devideDataInChunk();
    });
  }

  onSubmitCategoriesEvent(data: any) {
    this.updateCategorys(data);
    this.devideDataInChunk();
    this.modalRef.hide();
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

  updateCategorys(res: any) {
    console.log(res);
      res.forEach(r => {
        this.categoriesData.push(r);
      });
  }

  openCategoryForm() {
    this.modalRef = this.modalService.show(this.input, this.config);
  }

  modelCloseEvent(event) {
    this.modalRef.hide();
    this.getCategories();
  }

}
