import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input('totalRecords') totalRecords: number;
  @Input('itemsPerPage') itemsPerPage: number;
  @Output() onPageChanged = new EventEmitter<{startItem: number, endItem:number}>();

  constructor() { }
 
  ngOnInit(): void {}
 
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * this.itemsPerPage;
    const endItem = event.page * this.itemsPerPage;
    this.onPageChanged.next({startItem, endItem});
  }

  ngOnChanges(obj:any) {
    console.log(obj.totalRecords.currentValue);
    this.totalRecords = obj.totalRecords.currentValue;
  }

}
