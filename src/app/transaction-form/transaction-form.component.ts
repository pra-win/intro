import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { CategoriesService } from './../services/categories.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
    
  @Input('transactionCategory') selectedCategory: string;

  transactionForm = new FormGroup({
    category : new FormControl(''),
    desc : new FormControl(''),
    amt : new FormControl(''),
    date : new FormControl('')
  });

  categories = [];

  transactionCategory = 'e';

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {

    this.selectedCategory && (this.transactionCategory = this.selectedCategory);
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data.response;
    });
  }

  onSubmit() {
    console.log(this.transactionForm.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.transactionCategory = changes.selectedCategory.currentValue;
  }

}
