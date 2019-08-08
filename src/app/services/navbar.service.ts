import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  activeLink = "";

  constructor(private router: Router) {

  }

  setActiveLink(link) {
    console.log("nav=",link);
    this.activeLink = link;
  }

  getActiveLink() {
    console.log("c=",this.router.url);
    console.log("nav=",this.activeLink);
    return this.activeLink;
  }
}
