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
  incomeFilter = [];
  expense = [];
  expenseFilter = [];
  incomeTotal: number;
  expenseTotal: number;
  itemsPerPage: number = 5;

  totalExpenseRecords: number;
  totalIncomeRecords: number;

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
    this.getTransactions();
  }

  getTransactions() {
    this.transactions.getTransactions((obs) => {
      obs.subscribe((data: any) => {
        data.sort((a: any, b: any) => {
          const aDate = new Date(a.tranDate).getTime();
          const bDate = new Date(b.tranDate).getTime();          
          return bDate - aDate;
        });
        this.transactionsData = data;
        this.setIncomeExpence(data)
      });
    }, {});
  }

  setIncomeExpence(transactionsData: any) {
    this.expense = [];
    this.income = [];
    this.incomeTotal = 0;
    this.expenseTotal = 0;
    transactionsData.forEach((t: any)=>{
      if(t.ctype === 'e') {
        this.expense.push(t);
        this.expenseTotal+= parseInt(t.amt);
      } else {
        this.income.push(t);
        this.incomeTotal+=parseInt(t.amt);
      }
    });
    this.expenseFilter = this.expense.slice(0, this.itemsPerPage);
    this.incomeFilter = this.income.slice(0, this.itemsPerPage);
    this.totalExpenseRecords = this.expense.length;
    this.totalIncomeRecords = this.income.length;
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

  onExpensePageChanged(data: {startItem: number, endItem: number}) {
    this.expenseFilter = this.expense.slice(data.startItem, data.endItem);
  }

  onIncomePageChanged(data: {startItem: number, endItem: number}) {
    this.incomeFilter = this.income.slice(data.startItem, data.endItem);
  }
}
