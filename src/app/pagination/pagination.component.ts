import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input('totalRecords') totalRecords: number;
  @Output() onPageChanged = new EventEmitter<{startItem: number, endItem:number}>();

  constructor() { }

  // contentArray = new Array(90).fill('');
  // returnedArray: string[];
 
  ngOnInit(): void {
    // this.contentArray = this.contentArray.map((v: string, i: number) => `Content line ${i + 1}`);
    // this.returnedArray = this.contentArray.slice(0, 10);
    console.log("totalRecords=",this.totalRecords);
  }
 
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    console.log(startItem, endItem);
    this.onPageChanged.next({startItem, endItem});
    //this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  ngOnChanges(obj:any) {
    console.log(obj.totalRecords.currentValue);
    this.totalRecords = obj.totalRecords.currentValue;
  }

}
