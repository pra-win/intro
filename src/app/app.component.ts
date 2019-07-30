import { Component } from '@angular/core';

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
  constructor(){
    this.testDecorator();
  }

  @log
  testDecorator() {
    //console.log("test decorator");
  }
}
