import { Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { NavbarService } from './../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  active = '';

  constructor(private router: Router, private nav: NavbarService) { }

  ngOnInit() {
    this.active = this.nav.getActiveLink();
    if(this.active === "") {
      this.active = this.router.url;
      this.nav.setActiveLink(this.active);
    }
    // this.subscription = this.router.events.subscribe((event:Event) => {
    //   if(event instanceof NavigationEnd ){
    //     console.log(event.url);
    //   }
    // });
  }

  onChange(nav) {
     this.nav.setActiveLink(nav);
     this.router.navigate([nav]);
  }

}
