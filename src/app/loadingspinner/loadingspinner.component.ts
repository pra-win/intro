import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from './../services/loading.service';

@Component({
  selector: 'app-loadingspinner',
  templateUrl: './loadingspinner.component.html',
  styleUrls: ['./loadingspinner.component.css']
})
export class LoadingspinnerComponent implements OnInit {
  showLoading = false;
  constructor(private loading:LoadingService) { }

  ngOnInit() {
    this.loading.getLoading().subscribe(data => {
        this.showLoading = data.loadingBar;
        console.log("show", this.showLoading);
    });
  }

  ngAfterViewInit() {}

}
