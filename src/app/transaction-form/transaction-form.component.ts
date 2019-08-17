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

  @Input('transactionCategory') selectedCategory: [];
  @Output() modalCloseEvent = new EventEmitter<string>();

  transactionForm = new FormGroup({
    category : new FormControl(''),
    tranDesc : new FormControl(''),
    amt : new FormControl(''),
    tranDate : new FormControl('')
  });

  categories = [];

  constructor(private transactions:TransactionsService) {}

  ngOnInit() {
    this.categories = this.selectedCategory;
    this.transactionForm.controls['category'].setValue(this.categories[0].cid, {onlySelf: true});
    this.transactionForm.controls['tranDate'].setValue(new Date(), {onlySelf: true});
  }

  onSubmit() {
    console.log(this.transactionForm.value);
    let params = this.transactionForm.value;
    this.transactions.addTransactions(params, (data) => {
      console.log(data);
    });
    this.modalCloseEvent.next();
  }

  ngOnChanges(changes: SimpleChanges) {
    //this.transactionCategory = changes.selectedCategory.currentValue;
  }

}
