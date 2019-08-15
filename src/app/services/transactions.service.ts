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

  getTransactions(callback) {
      this.http.get<TraObj>(environment.apiURLs.getTransactions).subscribe((data) => {
        if(data.response) {
          this.transactions = data.response;
        }
        callback && callback(this.transactions);
        this.setTransactions(this.transactions);
      });
  }

  addTransactions(params, callback) {
    return this.http.post<TraObj>(environment.apiURLs.addTransactions, params).subscribe((data) => {
      callback && callback(data);
      data.success && this.getTransactions(false);
    });
  }

  getUpdatedTransactions(): Observable<any> {
      return this.subject.asObservable();
  }

  setTransactions(val) {
      this.subject.next(val);
  }

  clearTransactions() {
      this.subject.next();
  }

}
