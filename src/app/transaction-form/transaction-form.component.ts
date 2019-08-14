import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { CategoriesService } from './../services/categories.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
    modalRef: BsModalRef;
    config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'loading'
    };
  @Input('transactionCategory') selectedCategory: string;
  @ViewChild('template', {static: false}) input;

  transactionForm = new FormGroup({
    category : new FormControl(''),
    desc : new FormControl(''),
    amt : new FormControl(''),
    date : new FormControl('')
  });

  categories = [];

  transactionCategory = 'e';

  constructor(private categoriesService: CategoriesService, private modalService: BsModalService) { }

  ngOnInit() {

    this.selectedCategory && (this.transactionCategory = this.selectedCategory);
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data.response;
      this.modalRef.hide()
    });
  }

  onSubmit() {
    console.log(this.transactionForm.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.transactionCategory = changes.selectedCategory.currentValue;
  }

  ngAfterViewInit() {
      console.log(this.input);
     this.modalRef = this.modalService.show(this.input, this.config);
    }

}
