import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CategoriesService } from './../services/categories.service';
import { TransactionsService } from './../services/transactions.service';
import { PreferenceService } from './../services/preference.service';

import { ProcessTransactions } from '../common/ProcessTransactions';

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
  isShowFutureTransaction: boolean = false;
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

  bsInlineRangeValue = new Date();
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  selectedTransaction: number;

  form: FormGroup;

  processTransactions = new ProcessTransactions();

  constructor(
    private transactions: TransactionsService,
    private modalService: BsModalService,
    private categoriesService: CategoriesService,
    private preferenceService: PreferenceService
    ) { }

  ngOnInit() {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    this.maxDate = new Date();
    this.bsRangeValue = [firstDay, lastDay];

    this.getTransactions();
  }

  getTransactions(id: number = null) {
    const formData = new FormData();
    const fromDate = this.bsRangeValue[0];
    const toDate = this.bsRangeValue[1];

    const obj = [
      {'fromDate': fromDate.toISOString(), 'toDate': toDate.toISOString()}
    ];
    
    formData.append('params', JSON.stringify(obj));

    this.transactions.getTransactions(formData).subscribe((data: any) => {
      let transData = data.response;
      transData.sort((a: any, b: any) => {
        const aDate = new Date(a.tranDate).getTime();
        const bDate = new Date(b.tranDate).getTime();          
        return bDate - aDate;
      });
      this.transactionsData = transData;
      this.isShowFutureTransaction = this.preferenceService.getPreference(this.preferenceService.ISSHOWFUTURERANSACTION) === "true";
      this.hideShowFutureTransaction(this.isShowFutureTransaction);
    });

  }

  setIncomeExpence(transactionsData: any) {
    this.expense = [];
    this.income = [];
    this.incomeTotal = 0;
    this.expenseTotal = 0;

    let {expense, income, incomeTotal, expenseTotal} = (this.processTransactions.setIncomeExpence(transactionsData));

    this.expense = expense;
    this.income = income;
    this.incomeTotal = incomeTotal;
    this.expenseTotal = expenseTotal;

    this.expenseFilter = this.expense.slice(0, this.itemsPerPage);
    this.incomeFilter = this.income.slice(0, this.itemsPerPage);
    this.totalExpenseRecords = this.expense.length;
    this.totalIncomeRecords = this.income.length;
  }

  hideShowFutureTransaction(isShowFutureTransaction: boolean) {
    let newTransactionsData = this.processTransactions.hideShowFutureTransaction(isShowFutureTransaction, this.transactionsData);
    
    this.setIncomeExpence(newTransactionsData);      
    this.preferenceService.setPreference(this.preferenceService.ISSHOWFUTURERANSACTION, this.isShowFutureTransaction);  
  }

  onTransaction(type:string, id:number = null ) {
    this.transactionType = type;
    this.selectedTransaction = id;
    this.categoriesService.getCategories(null).subscribe((data) => {
      this.transactionCategory = data.response;
      this.filterData(type);
      this.modalRef = this.modalService.show(this.input, this.config);
    });
  }

  filterData(type) {
    this.transactionCategoryFilterData = this.transactionCategory.filter((d) => {
      return d.type === type
    })
    console.log("cat=",this.transactionCategoryFilterData);
    
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

  filterDatewise() {
    this.getTransactions();
  }

  onSubmitTransaction(event) {
    console.log(event);
    this.getTransactions();
  }
}
