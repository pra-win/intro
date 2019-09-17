import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
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
  @Input('transactionType') transactionType: '';
  @Output() modalCloseEvent = new EventEmitter<string>();
  @Output() changeCategoryType = new EventEmitter<string>();

  transactionForm: FormGroup;

  categories = [];

  constructor(private transactions:TransactionsService, private fb: FormBuilder) {}

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
  }

  getTransactionFormControls(): FormGroup {
    return new FormGroup({
      category: this.fb.control(this.categories[0].cid, Validators.required),
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
    let params = JSON.stringify(this.transactionForm.value.transactionFormArray);
    const formData = new FormData();
    formData.append("data",params);
    this.transactions.addTransactions(formData, (data: any) => {
      console.log(data);
    });
    this.modalCloseEvent.next();
  }

  onChangeCategoryType(type: any) {
    this.changeCategoryType.next(type);
    this.tType = type;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.categories = changes.selectedCategory.currentValue;
  }

  removeForm(index: number): void{
    (<FormArray>this.transactionForm.get('transactionFormArray')).removeAt(index);
  }
}
