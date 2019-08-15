import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { LoadingService } from './../services/loading.service';

@Component({
  selector: 'app-loadingspinner',
  templateUrl: './loadingspinner.component.html',
  styleUrls: ['./loadingspinner.component.css']
})
export class LoadingspinnerComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'loading-spinner'
  };

    @ViewChild('template', {static: false}) input;

  constructor(private modalService: BsModalService, private loading:LoadingService) { }

  ngOnInit() {
    this.loading.getLoading().subscribe(data => {
        if(data.loadingBar) {
          console.log("show loading");
          //this.modalRef = this.modalService.show(this.input, this.config);
        } else {

          setTimeout(() => {
            console.log("hide loading");
          //  this.modalRef.hide();
          },1000);

        }
    });
  }

  ngAfterViewInit() {
    //console.log(this.input);

  }

}
