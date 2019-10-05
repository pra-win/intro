import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './../services/transactions.service';
import { TransactionObj as TraObj} from './../interfaces';
import { environment } from './../../environments/environment';

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
  private itemsPerPage: number = 5;

  exportUrl = environment.apiURLs.exportTransactions;

  get searchTerm(): string {
    return this.filterKeyword;
  }

  set searchTerm(value: string) {
    this.filterKeyword = value;
    this.onTransactionFilter(value);
  }

  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    
    this.maxDate = new Date();
    this.bsRangeValue = [firstDay, lastDay];
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
      const fromDate = this.bsRangeValue[0];
      const toDate = this.bsRangeValue[1];

      const obj = [
        {'fromDate': fromDate.toISOString(), 'toDate': toDate.toISOString()}
      ];
      
      formData.append('params', JSON.stringify(obj));

      this.transactionsService.getTransactions(formData).subscribe((data: any) => {
        let transData = data.response;
        transData.sort((a: any, b: any) => {
          const aDate = new Date(a.tranDate).getTime();
          const bDate = new Date(b.tranDate).getTime();
          return bDate - aDate;
        });
        this.transactions = transData;
        this.filterTransactions = transData.slice(0, this.itemsPerPage);
        this.totalRecords = this.transactions.length;
      });
  }

  onPageChanged(data: {startItem: number, endItem: number}) {
    this.paginationIndex = data;
    this.filterTransactions = this.transactions.slice(data.startItem, data.endItem);
  }

  filterDatewise() {
    this.getTransactions();
  }

}
