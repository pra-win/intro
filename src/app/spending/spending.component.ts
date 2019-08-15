import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TransactionsService } from './../services/transactions.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CategoriesService } from './../services/categories.service';

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

  transactionCategory = [];

  modalRef: BsModalRef;

  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private transactions: TransactionsService,
    private modalService: BsModalService,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.transactions.getTransactions((obs) => {
      obs.subscribe((data) => {
        this.transactionsData = data;
        this.setIncomeExpence(data)
      });
    });
  }

  setIncomeExpence(transactionsData) {
    this.expense = [];
    this.income = [];
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
    this.categoriesService.getCategories().subscribe((data) => {
      this.transactionCategory = data.response.filter((d) => {
        return d.type === type
      });
      this.modalRef = this.modalService.show(this.input, this.config);
    });
  }

  ngAfterViewInit() {
      console.log(this.input);
     // this.modalRef = this.modalService.show(this.input);
    }

}
