import { Component, OnInit } from '@angular/core';
import { RecordsService } from './../services/records.service';

@Component({
  selector: 'app-child-cop',
  templateUrl: './child-cop.component.html',
  styleUrls: ['./child-cop.component.css']
})
export class ChildCopComponent implements OnInit {
  data = {};

  constructor(private recordsService:RecordsService) { }

  ngOnInit() {
    console.log("ngOnUnit");
    this.recordsService.getData().subscribe(d => {
      console.log(d);
      this.data = d;
    });
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
