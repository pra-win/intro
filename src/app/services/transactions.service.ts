import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { TransactionObj as TraObj} from './../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions() {
      return this.http.get<TraObj>(environment.apiURLs.getTransactions);
  }
}
