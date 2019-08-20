import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


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

  signUpForm = new FormGroup({
    uid: new FormControl(''),
    pass: new FormControl(''),
    conPass: new FormControl('')
  });

  constructor(private authService:AuthService, private router:Router, private activatedRoute: ActivatedRoute) { }

  return: string = '';

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => this.return = params['return'] || '/admin');
  }
  loginUser() {
    event.preventDefault();
    let {uid, pass} = this.loginForm.value;
    this.authService.getUserDetails(uid, pass).subscribe(data => {
      console.log(data);
      if(data.success) {
        //this.router.navigate(['admin']);
        this.router.navigateByUrl(this.return);
        this.authService.setLoggedIn(data.success);
      } else {
        alert(data.message);
      }
    });;
  }
}
