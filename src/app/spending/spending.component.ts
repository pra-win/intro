import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TransactionsService } from './../services/transactions.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CategoriesService } from './../services/categories.service';
import { FileUploadService } from './../services/file-upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpParams, HttpRequest } from  '@angular/common/http';

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
  uploadResponse;


  constructor(
    private transactions: TransactionsService,
    private modalService: BsModalService,
    private categoriesService: CategoriesService,
    private uploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit() {
    this.transactions.getTransactions((obs) => {
      obs.subscribe((data) => {
        this.transactionsData = data;
        this.setIncomeExpence(data)
      });
    });
    this.form = this.formBuilder.group({
      avatar: ['']
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

  selectedFile: File;

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(event);
      this.form.get('avatar').setValue(this.selectedFile);
    }
  }

  onSubmit() {
    // const formData = new FormData();
    // formData.append('avatar', this.selectedFile, this.selectedFile.name);

    // console.log(formData.get('avatar'));

    // this.http.post("api/testApi/fileUploadTest.php", formData, {
    //   headers: {
    //     'Accept': 'application/json'
    //   }
    // }).subscribe( event => {
    //   console.log(event);
    // });

    const formData = new FormData();
        formData.append('excel', this.selectedFile);

        const params = new HttpParams();

        const options = {
            params,
            reportProgress: true,
        };

        const req = new HttpRequest('POST', 'api/testApi/fileUploadTest.php', formData, options);
        this.http.request(req).subscribe(console.log)

    // this.uploadService.uploadFile(formData).subscribe(
    //   (res) => {
    //     this.uploadResponse = res;
    //       console.log(res);
    //   },
    //   (err) => {  
    //     console.log(err);
    //   }
    // );
  }

}
