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

  /** Replace the getTransactions with following function */
  getTransactions(params: any) {    
    return this.http.post<TraObj>(environment.apiURLs.getTransactions, params);
  }

  addTransactions(params: any, callback: any) {
    return this.http.post<TraObj>(environment.apiURLs.addTransactions, params).subscribe((data) => {
      callback && callback(data);
    });
  }

  editTransactions(params: any) {
    return this.http.post<TraObj>(environment.apiURLs.editTransactions, params);
  }

  deleteTransaction(params: any) {
    return this.http.post<TraObj>(environment.apiURLs.deleteTransactions, params);
  }
}
