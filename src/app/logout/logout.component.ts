import { Component, OnInit } from '@angular/core';
import { LogoutService } from './../services/logout.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private logout:LogoutService, private router:Router, private auth:AuthService) { }

  ngOnInit() {
    this.logout.getLogoutStatus()
                .subscribe(data => {
                  if(data.success) {
                    this.router.navigate(['']);
                    this.auth.setLoggedIn(false);
                  }
                });
  }

}
