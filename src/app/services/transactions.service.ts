import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { TransactionObj as TraObj} from './../interfaces';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private subject = new Subject<any>();

  private transactions = [];

  constructor(private http: HttpClient) { }

  getTransactions(callback: any, dateRange: any) {    
      this.http.post<TraObj>(environment.apiURLs.getTransactions, dateRange ).subscribe((data:any) => {
        if(data.response) {
          this.transactions = data.response;
        }
        callback && callback(this.getUpdatedTransactions());
        this.setTransactions(this.transactions);
      });
  }

  addTransactions(params: any, callback: any) {
    return this.http.post<TraObj>(environment.apiURLs.addTransactions, params).subscribe((data) => {
      callback && callback(data);
      //data.success && this.getTransactions(false, {startItem:0, endItem:0});
    });
  }

  private getUpdatedTransactions(): Observable<any> {
      return this.subject.asObservable();
  }

  private setTransactions(val) {
      this.subject.next(val);
  }

  private clearTransactions() {
      this.subject.next();
  }

}
