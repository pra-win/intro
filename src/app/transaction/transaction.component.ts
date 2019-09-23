import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './../services/transactions.service';
import { TransactionObj as TraObj} from './../interfaces';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions = [];
  private filterKeyword: string;
  filterTransactions = [];

  get searchTerm(): string {
    return this.filterKeyword;
  }

  set searchTerm(value: string) {
    this.filterKeyword = value;
    this.onTransactionFilter(value);
  }

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
      this.getTransactions();
  }

  onTransactionFilter(value: string): void {
    console.log(value);
    this.filterTransactions = this.transactions.filter(o => {
      return o.keyWords.toLowerCase().indexOf(value.toLowerCase()) !== -1
    });
  }

  onFileUpload(event) {
      this.getTransactions();
  }

  getTransactions() {
      this.transactionsService.getTransactions((obs) => {
        obs.subscribe((data) => {
          this.transactions = data;
          this.filterTransactions = data;
        });
      });
  }

}
