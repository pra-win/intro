import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CategoriesService } from './../services/categories.service';
import { CategoriesObj as ResObj} from './../interfaces';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  categoryForm :FormGroup;
  CATEGORY_TYPE = {A: '', I: 'i', E: 'e'};
  showType = this.CATEGORY_TYPE.A;

  @Output() onSubmitCategoriesEvent = new EventEmitter<any>();
  @Output() modelCloseEvent = new EventEmitter<any>();

  constructor(
    private categories: CategoriesService, 
    private fb: FormBuilder) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoriesArray: this.fb.array([])
    });
    this.addCategoryForm();
  }

  addCategory(event: any) {
    event.preventDefault();
    const categoriesArray = this.categoryForm.value.categoriesArray;

    const formData = new FormData();
    formData.append('data', JSON.stringify(categoriesArray));
    this.categories.addCategory(formData)
                    .subscribe((data: ResObj) => {
                      console.log(data);
                      if(data.success) {
                        //this.onSubmitCategoriesEvent.next(data.response);
                      }
                    });
    this.modelCloseEvent.next();  
    this.clearCategoryForm();
  }

  addCategoriesArray(): FormGroup {
    return this.fb.group({
      cname: this.fb.control('', Validators.required),
      type: this.fb.control('', Validators.required)
    });
  }

  addCategoryForm(): void{
    (<FormArray>this.categoryForm.get('categoriesArray')).push(this.addCategoriesArray());
  }

  onRemoveCategory(index: number): void {
    (<FormArray>this.categoryForm.get('categoriesArray')).removeAt(index);
  }

  clearCategoryForm():void {
    (<FormArray>this.categoryForm.get('categoriesArray')).clear();
  }

  // logValidationErrors(group: FormGroup = this.categoryForm): void {
  //   Object.keys(group.controls).forEach((key: string) => {
  //     const abstractControl = group.get(key);

  //     if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
  //       //const messages = this.validationMessages[key];
  //       for(const errorKey in abstractControl.errors) {
  //         //this.formErrors[key] += messages[errorKey] + ' ';
  //         console.log(errorKey);
  //       }
  //     }

  //     if(abstractControl instanceof FormArray) {
  //       for(const control of abstractControl.controls) {
  //           if(control instanceof FormGroup) {
  //               this.logValidationErrors(control);
  //           }
  //       }
  //     }
  //   });
  // }

}
