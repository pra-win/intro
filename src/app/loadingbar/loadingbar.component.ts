import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from './../services/loading.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-loadingbar',
  templateUrl: './loadingbar.component.html',
  styleUrls: ['./loadingbar.component.css']
})
export class LoadingbarComponent implements OnInit {

  showLoading = false;

  constructor(private loading: LoadingService) { }

  ngOnInit() {
      this.loading.getLoading().subscribe(data => {
          setTimeout(() => {
            this.showLoading = data.loadingBar;
          },0);
      });
  }

  ngAfterViewInit()	{

  }
}
