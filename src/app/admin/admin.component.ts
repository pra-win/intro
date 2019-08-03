import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  message = "Loading...";
  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getUserData()
            .subscribe(data => {
              //if(data.success) {
                this.message = data.message;
              //}
            });
  }

}
