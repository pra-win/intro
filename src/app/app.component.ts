import { Component } from '@angular/core';
import { RecordsService } from './services/records.service';

function log(){
  //console.log("Test decorator");
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'intro';
  data = {};

  constructor(private recordsService: RecordsService){
    this.testDecorator();
  }

  //@log
  testDecorator() {
    //console.log("test decorator");
  }

  ngOnInit() {
  }
}
