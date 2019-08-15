import { Component, OnInit } from '@angular/core';
import { LoadingService } from './../services/loading.service';

@Component({
  selector: 'app-loadingbar',
  templateUrl: './loadingbar.component.html',
  styleUrls: ['./loadingbar.component.css']
})
export class LoadingbarComponent implements OnInit {

    showLoading = false;

  constructor(private loading: LoadingService) { }

  ngOnInit() {
      this.loading.getLoading().subscribe(data => {
          this.showLoading = data.loadingBar;
      });
  }

}
