import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
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

  transactionForm = new FormGroup({
    category : new FormControl(''),
    tranDesc : new FormControl(''),
    amt : new FormControl(''),
    tranDate : new FormControl('')
  });

  categories = [];

  constructor(private transactions:TransactionsService) {}

  ngOnInit() {
    this.tType = this.transactionType;
    this.categories = this.selectedCategory;
    this.transactionForm.controls['category'].setValue(this.categories[0].cid, {onlySelf: true});
    this.transactionForm.controls['tranDate'].setValue(new Date(), {onlySelf: true});
  }

  onSubmit() {
    let params = this.transactionForm.value;
    this.transactions.addTransactions(params, (data) => {});
    this.modalCloseEvent.next();
  }

  onChangeCategoryType(type) {
    this.changeCategoryType.next(type);
    this.tType = type;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.categories = changes.selectedCategory.currentValue;
  }

}
