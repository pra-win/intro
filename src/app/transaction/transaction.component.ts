import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './../services/transactions.service';
import { TransactionObj as TraObj} from './../interfaces';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions:TraObj;
  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
      this.transactionsService.getTransactions()
                        .subscribe(res => {
                            if(res.success) {
                                this.transactions = res;
                            }
                        });
  }

}
