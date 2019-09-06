import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // This FormGroup contains fullName and Email form controls
  employeeForm: FormGroup;
  fullNameLength = 0;

  validationMessages = {
    'fullName': {
      'required': 'Fill name is required.',
      'minlength': 'Min length is 2',
      'maxlength': 'Max length is 10.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domain should be win-tech.com'
    },
    'phone': {
      'required': 'Phone is required.'
    },
    'skillName': {
      'required': 'Skill is required.'
    },
    'experience': {
      'required': 'Fill is required.'
    },
    'proficiency': {
      'required': 'Proficiency is required.'
    }
  }

  formErrors = {
    'fullName': '',
    'email': '',
    'skillName': '',
    'experience': '',
    'proficiency': '',
    'phone': ''
  }

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
      email: ['', [Validators.required, emailDomain('win-tech.com')]],
      phone: [''],
      contactPref: ['email'],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experience: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
    });

    this.employeeForm.get("fullName").valueChanges.subscribe((value: string) => {
      console.log(value);
      this.fullNameLength = value.length;
    });

    this.employeeForm.valueChanges.subscribe((value: any) => {
      console.log( JSON.stringify(value));
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm.get("contactPref").valueChanges.subscribe((value: string) => {
      console.log(value);
      this.onContactPrefChange(value);
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
  }

  onLoadDataClick(): void {
    this.employeeForm.setValue({
      fullName: "t",
      email: "email",
      phone: "8796141211",
      contactPref: "phone",
      skills: {
        skillName: 'skill name',
        experience: 'expe',
        proficiency: 'intermediate'
      }
    });

    //this.logValidationErrors(this.employeeForm);
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    //console.log(group.controls);
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      if(abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        // console.log('Key=',key, ' Value=',abstractControl.value);
        // abstractControl.markAsDirty();
        // abstractControl.disable();

        // console.log(abstractControl.errors);

        this.formErrors[key] = '';

        if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for(const errorKey in abstractControl.errors) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
    });
    console.log(this.formErrors);
  }

  onPatchDataClick(): void {
    this.employeeForm.patchValue({
      fullName: "p test",
      email: "p email",
    });
  }

  onContactPrefChange(pref: string): void {
    const phoneControl = this.employeeForm.get('phone');
    const emailControl = this.employeeForm.get('email');

    if(pref === 'phone') {
      phoneControl.setValidators(Validators.required);
      emailControl.clearValidators();
    } else {
      phoneControl.clearValidators();
      emailControl.setValidators(Validators.required);
    }

    phoneControl.updateValueAndValidity();
    emailControl.updateValueAndValidity();
  }

}

function emailDomain (doaminName: string ) {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const email: string = control.value;
    const emailDoamin = email.substring(email.lastIndexOf('@')+1);
  
    if(emailDoamin.toLowerCase() === doaminName.toLowerCase() || !email) {
      return null;
    } else {
      return {'emailDomain': true};
    }
  };
}