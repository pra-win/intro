import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    uid: new FormControl(''),
    pass: new FormControl('')
  });
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }
  loginUser() {
    event.preventDefault();
    let {uid, pass} = this.loginForm.value;
    this.authService.getUserDetails(uid, pass).subscribe(data => {
      console.log(data);
      if(data.success) {
        this.router.navigate(['admin'])
      } else {
        alert(data.message);
      }
    });;
  }
}
