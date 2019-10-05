import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators} from '@angular/forms';
// import { BsDatepickerModule } from 'ngx-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TransactionsService } from './../services/transactions.service';
import { TransactionObj as TraObj} from './../interfaces';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  bsValue = new Date();
  tType = ''

  @Input('transactionCategory') selectedCategory: [];
  @Input('transactionType') transactionType: string;
  @Input('selectedTransaction') selectedTransaction: number;
  @Output() modalCloseEvent = new EventEmitter<string>();
  @Output() changeCategoryType = new EventEmitter<string>();
  @Output() onSubmitTransaction = new EventEmitter<any>();

  transactionForm: FormGroup;

  categories = [];

  modalRef: BsModalRef;
  message: string;

  constructor(
    private transactions:TransactionsService, 
    private fb: FormBuilder, 
    private modalService: BsModalService) {}

  ngOnInit() {

    this.transactionForm = this.fb.group(
      {
        transactionFormArray: this.fb.array([this.getTransactionFormControls()])
      }
    );

    this.tType = this.transactionType;
    this.categories = this.selectedCategory;
    // this.transactionForm.controls['category'].setValue(this.categories[0].cid, {onlySelf: true});
    // this.transactionForm.controls['tranDate'].setValue(new Date(), {onlySelf: true});
    //this.setDefaultCategory(this.categories);

    setTimeout(() => {
      if(this.selectedTransaction) {
        let formData = new FormData();
        let obj = [{id: this.selectedTransaction}];
        formData.append('params', JSON.stringify(obj));
        this.transactions.getTransactionsNew(formData).subscribe((data: any) => {
          this.patchData(data.response[0]);
        });
      }
    });
  }

  patchData(data:any) {
    data.tranDate = new Date(data.tranDate);
    (<FormArray>this.transactionForm.get('transactionFormArray')).controls[0].patchValue(data);
  }

  getTransactionFormControls(): FormGroup {
    return new FormGroup({
      id: this.fb.control(''),
      category: this.fb.control('', Validators.required),
      tranDesc: this.fb.control(''),
      amt: this.fb.control('',Validators.required),
      tranDate: this.fb.control(new Date(), Validators.required),
      keyWords: this.fb.control('')
    });
  }

  addTransactionForm(): void {
    (<FormArray>this.transactionForm.get('transactionFormArray')).push(this.getTransactionFormControls());
  }

  onSubmit() {
    let formValues = this.transactionForm.value.transactionFormArray;
    let params = JSON.stringify(formValues);
    const formData = new FormData();
    formData.append("data",params);
    this.transactions.addTransactions(formData, (data: any) => {
      console.log(data);
    });
    this.modalCloseEvent.next();
    this.onSubmitTransaction.next();
  }

  updateTransaction() {
    let formValues = this.transactionForm.value.transactionFormArray;

    let params = JSON.stringify(formValues);
    const formData = new FormData();
    formData.append("data",params);

    this.transactions.editTransactions(formData).subscribe((data) => {
      console.log(data);
    });
    
    this.modalCloseEvent.next();
    this.onSubmitTransaction.next();
  }

  onChangeCategoryType(type: any) {
    this.changeCategoryType.next(type);
    this.tType = type;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.categories = changes.selectedCategory.currentValue;
    setTimeout(() => {
      this.setDefaultCategory(this.categories);
    }, 0);
  }

  removeForm(index: number): void {
    (<FormArray>this.transactionForm.get('transactionFormArray')).removeAt(index);
  }

  setDefaultCategory(categories: any) {
    let controls = ((<FormArray>this.transactionForm.get('transactionFormArray')).controls);
    controls.forEach((g) => {
      (<FormGroup>g).get('category').setValue(categories[0].cid, {onlySelf: true});      
    });
  }

  onDeleteTransaction(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDelete(): void {
    this.message = 'Confirmed!';

    let formValues = this.transactionForm.value.transactionFormArray;

    let params = JSON.stringify(formValues);
    const formData = new FormData();
    formData.append("data",params);

    this.transactions.deleteTransaction(formData).subscribe((data) => {
      this.modalRef.hide();
      this.onSubmitTransaction.next();
      this.modalCloseEvent.next();
    });
  }
 
  deleteDecline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
