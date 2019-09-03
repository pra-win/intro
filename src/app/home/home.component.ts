import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // This FormGroup contains fullName and Email form controls
  employeeForm: FormGroup;
  fullNameLength = 0;

  constructor(private fb: FormBuilder) { }

  // Initialise the FormGroup with the 2 FormControls we need.
  // ngOnInit ensures the FormGroup and it's form controls are
  // created when the component is initialised
  ngOnInit() {
    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experience: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });

    this.employeeForm = this.fb.group({
      fullName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experience: [''],
        proficiency: ['']
      })
    });

    this.employeeForm.get("fullName").valueChanges.subscribe((value: string) => {
      console.log(value);
      this.fullNameLength = value.length;
    });

    this.employeeForm.valueChanges.subscribe((value: any) => {
      console.log( JSON.stringify(value));
    });

  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
  }

  onLoadDataClick(): void {
    this.employeeForm.setValue({
      fullName: "test",
      email: "email",
      skills: {
        skillName: 'skill name',
        experience: 'expe',
        proficiency: 'intermediate'
      }
    });
  }

  onPatchDataClick(): void {
    this.employeeForm.patchValue({
      fullName: "p test",
      email: "p email",
    });
  }

}
