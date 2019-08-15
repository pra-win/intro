import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  message = "Loading...";
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    // console.log(this.auth.isLoggedIn);
    // if(this.auth.isLoggedIn) {
    //   this.router.navigate(['/admin/spending']);
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }

}
