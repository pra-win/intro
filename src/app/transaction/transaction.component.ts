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
  totalRecords: number;
  paginationIndex: {startItem: number, endItem: number}; 

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

  onFileUpload(event: any) {
      this.getTransactions();
  }

  getTransactions() {
    const formData = new FormData();
    // let {startItem, endItem} = this.paginationIndex;
    formData.append("data", JSON.stringify(this.paginationIndex));

      this.transactionsService.getTransactions((obs:any) => {
        obs.subscribe((data: any) => {
          data.sort((a: any, b: any) => {
            const aDate = new Date(a.tranDate).getTime();
            const bDate = new Date(b.tranDate).getTime();
            return bDate - aDate;
          });
          this.transactions = data;
          this.filterTransactions = data;
          this.totalRecords = this.filterTransactions.length;
          console.log(this.totalRecords);
        });
      }, formData);
  }

  onPageChanged(data: {startItem: number, endItem: number}) {
    console.log(data);
    this.paginationIndex = data;
    this.getTransactions();
  }

}
