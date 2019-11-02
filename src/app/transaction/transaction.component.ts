import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './../services/transactions.service';
import { TransactionObj as TraObj} from './../interfaces';
import { environment } from './../../environments/environment';
import { ProcessTransactions } from '../common/ProcessTransactions'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions = [];
  private filterKeyword: string;
  filterTransactions = [];
  categoryFilter: string;
  keyworldFilter: string;
  totalRecords: number;
  paginationIndex: {startItem: number, endItem: number}; 
  private itemsPerPage: number = 5;

  exportUrl = environment.apiURLs.exportTransactions;

  bsRangeValue: Date[];
  maxDate = new Date();

  ProcessTransaction = new ProcessTransactions();

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    
    this.maxDate = new Date();
    this.bsRangeValue = [firstDay, lastDay];
    this.getTransactions();
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
        this.transactions = this.ProcessTransaction.sortTransactionsDateWise(data.response);

        let filterObj = Object.assign({}, this.ProcessTransaction.filterObj);

        filterObj.category = this.categoryFilter ? this.categoryFilter.split(',') : [];
        filterObj.keywords = this.keyworldFilter ? this.keyworldFilter.split(',') : [];

        this.transactions = this.ProcessTransaction
                                  .filterTransactions(filterObj, this.transactions);

        this.filterTransactions = this.transactions.slice(0, this.itemsPerPage);
        this.totalRecords = this.transactions.length;
      });
  }

  onPageChanged(data: {startItem: number, endItem: number}) {
    this.paginationIndex = data;
    this.filterTransactions = this.transactions.slice(data.startItem, data.endItem);
  }
}
