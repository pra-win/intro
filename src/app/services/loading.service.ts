import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

    showLoading = false;

  constructor() { }

  // get isShowLoading() {
  //     return this.showLoading;
  // }

  // set isShowLoading(val) {
  //     this.showLoading = val;
  // }

  private subject = new Subject<any>();

    sendMessage(isLoading: boolean ) {
        this.subject.next({ loading: isLoading });
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

}
