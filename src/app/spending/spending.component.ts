import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './../services/transactions.service';

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.css']
})
export class SpendingComponent implements OnInit {

  transactionsData = [];
  income = [];
  expense = [];
  incomeTotal = 0;
  expenseTotal = 0;

  constructor(private transactions: TransactionsService) { }

  ngOnInit() {
    this.transactions.getTransactions().subscribe((data) => {
      this.transactionsData = data.response;
      if(data.response) {
        this.setIncomeExpence(data.response);
      }
    });
  }

  setIncomeExpence(transactionsData) {
    transactionsData.forEach((t)=>{
      if(t.ctype === 'e') {
        this.expense.push(t);
        this.expenseTotal+=t.amt;
      } else {
        this.income.push(t);
        this.incomeTotal+=t.amt;
      }
    });
  }

}
