import { Component, OnInit } from '@angular/core';
import { RecordsService } from './../services/records.service';

@Component({
  selector: 'app-child-cop',
  templateUrl: './child-cop.component.html',
  styleUrls: ['./child-cop.component.css']
})
export class ChildCopComponent implements OnInit {

  constructor(private recordsService:RecordsService) { }

  ngOnInit() {
    console.log("ngOnUnit");
    console.log(this.recordsService.getData());
  }

  ngOnChanges() {
    console.log("ngOnChanges");
  }

  ngDoCheck() {
    console.log("ngDoCheck");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit")
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked")
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked");
  }

  ngOndestroy() {
    console.log("ngOndestroy");
  }

}
