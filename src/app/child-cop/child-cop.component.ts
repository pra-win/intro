import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-cop',
  templateUrl: './child-cop.component.html',
  styleUrls: ['./child-cop.component.css']
})
export class ChildCopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("ngOnUnit");
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
