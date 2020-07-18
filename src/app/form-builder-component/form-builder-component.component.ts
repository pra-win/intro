import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-builder-component',
  templateUrl: './form-builder-component.component.html',
  styleUrls: ['./form-builder-component.component.less']
})
export class FormBuilderComponentComponent implements OnInit {

  employeeFrom: FormGroup;
  validationMessages = {
    fullName: {
      'required': 'Full name is required',
      'minlength': 'Min length is 2',
      'maxlength': 'Max length is 10'
    },
    email: {
      'required': 'Email is required'
    },
    phone: {
      'required': 'Phone is required'
    },
    name: {
      'required': 'Skill name is required'
    }
  }

  formErrors = {
    fullName: '',
    email: '',
    phone: '',
    name: ''
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    /** Using class */
    // this.employeeFrom = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({
    //     name: new FormControl(),
    //     experience: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });

    /** Using FormBuilder service */
    this.employeeFrom = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreferance: ['email'],
      email: ['', Validators.required],
      phone: [''],
      skills: this.fb.array([this.addSkillsFormGroup()])
    });

    /** valueChanges */
    this.employeeFrom.valueChanges.subscribe(value => {
      this.logValidationErrors(this.employeeFrom);
    });

    this.employeeFrom.get('contactPreferance').valueChanges.subscribe(value => {
      this.onContactPreferanceChange(value);
    });
  }

  addSkillsFormGroup() :FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      experience: ['', Validators.required],
      proficiency: ['b', Validators.required]
    });
  }

  addSkill(): void {
   const skills = this.employeeFrom.get('skills');
   (<FormArray>skills).push(this.addSkillsFormGroup()); 
   console.log(this.employeeFrom.get('skills')['controls']);
  }

  /** Dynamically ass validation */
  onContactPreferanceChange(value: string): void {
    const phoneControl = this.employeeFrom.get('phone');
    if(value == 'phone') {
      phoneControl.setValidators([Validators.required, Validators.minLength(10)]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  logValidationErrors(formGroup: FormGroup = this.employeeFrom): void {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);
      this.formErrors[key] = [];
      if(abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          let messages = this.validationMessages[key];
          
          for(const errorKey in abstractControl.errors) {
            if(errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';  
            }
          }
        }
      }
    });
  }

  removeSkill(index: number): void {
    (<FormArray>this.employeeFrom.get('skills')).removeAt(index);
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
