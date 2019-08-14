import { Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { LogoutService } from './../services/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private logout:LogoutService) { }

  ngOnInit() {
  }

  onLogout() {
    this.logout.getLogoutStatus();
  }
}
