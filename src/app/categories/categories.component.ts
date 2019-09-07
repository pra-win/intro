import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from './../services/categories.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
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

  categoryForm :FormGroup;

  newData = [];

  constructor(
      private categories: CategoriesService, 
      private modalService: BsModalService, 
      private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.categoryForm = this.fb.group({
      categoriesArray: this.fb.array([this.addCategoriesArray()])
    });   


    this.categories.getCategories().subscribe(data => {
      data.success && (this.categoriesData = data.response);
      this.devideDataInChunk();
    });
  }

  addCategoriesArray(): FormGroup {
    return this.fb.group({
      cname: this.fb.control(''),
      type: this.fb.control('')
    });
  }

  addCategoryForm(): void{
    (<FormArray>this.categoryForm.get('categoriesArray')).push(this.addCategoriesArray());
  }

  onRemoveCategory(index: number): void {
    (<FormArray>this.categoryForm.get('categoriesArray')).removeAt(index);
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
    //this.categoryForm.controls['type'].setValue(this.showType, {onlySelf: true});
    this.modalRef = this.modalService.show(this.input, this.config);
  }

}
