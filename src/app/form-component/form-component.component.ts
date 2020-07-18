import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.less']
})
export class FormComponentComponent implements OnInit {

  employeeFrom: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.employeeFrom = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        name: new FormControl(),
        experience: new FormControl(),
        proficiency: new FormControl()
      })
    });
  }

  onSubmit(): void {
    console.log(this.employeeFrom.value);
    console.log(this.employeeFrom.get('email'));
    console.log(this.employeeFrom.controls.fullName);
  }

  onLoadData(): void {
    // For all the controlls
    // this.employeeFrom.setValue({
    //   fullName: "Pravin Bhosale",
    //   email: "bhosale.pravinp@gmail.com",
    //   skills: {
    //     name: "NGX",
    //     experience: "2 year",
    //     proficiency: "i"
    //   }
    // });

    // For sub form controlls
    this.employeeFrom.patchValue({
      fullName: "Pravin Bhosale",
      email: "bhosale.pravinp@gmail.com",
      skills: {
        name: "NGX",
        experience: "2 year",
        proficiency: "i"
      }
    });

  }

}
