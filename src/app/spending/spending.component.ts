import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TransactionsService } from './../services/transactions.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.css']
})
export class SpendingComponent implements OnInit {

    @ViewChild('template', {static: false}) input;

  transactionsData = [];
  income = [];
  expense = [];
  incomeTotal = 0;
  expenseTotal = 0;

  transactionCategory = 'i';

  modalRef: BsModalRef;

  constructor(private transactions: TransactionsService, private modalService: BsModalService) { }

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

  onTransaction(type) {
    this.transactionCategory = type;
  }

  ngAfterViewInit() {
      console.log(this.input);
      this.modalRef = this.modalService.show(this.input);
    }

}
