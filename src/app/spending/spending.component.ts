import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TransactionsService } from './../services/transactions.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CategoriesService } from './../services/categories.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  transactionCategoryFilterData = [];
  transactionType = '';

  modalRef: BsModalRef;

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modal-lg"
  };

  form: FormGroup;

  constructor(
    private transactions: TransactionsService,
    private modalService: BsModalService,
    private categoriesService: CategoriesService
    ) { }

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
    this.incomeTotal = 0;
    this.expenseTotal = 0;
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
    this.transactionType = type;
    this.categoriesService.getCategories().subscribe((data) => {
      this.transactionCategory = data.response;
      this.filterData(type);
      this.modalRef = this.modalService.show(this.input, this.config);
    });
  }

  filterData(type) {
    this.transactionCategoryFilterData = this.transactionCategory.filter((d) => {
      return d.type === type
    })
  }

  ngAfterViewInit() {
      console.log(this.input);
     // this.modalRef = this.modalService.show(this.input);
    }

  changeCategoryType(type) {
    this.filterData(type);
  }
}
