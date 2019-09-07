import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';

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
    'emailGroup': {
        'emailMisMatch': 'Email and confirm email do not match.'
    },
    'confirmEmail': {
        'required': 'Confirm email is required.'
    },
    'phone': {
      'required': 'Phone is required.'
    }
  }

  formErrors = {}

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
      phone: [''],
      contactPref: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidators.emailDomain('win-tech.com')]],
        confirmEmail: ['', [Validators.required]],
    }, {validator: matchEmail}),
      skills: this.fb.array([this.addSkillFormGroup()])
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
      emailGroup: {
        email: "email",
        confirmEmail: "email"
      },      
      phone: "8796141211",
      contactPref: "phone",
      skills: 
          [
            {
              skillName: 'skill name',
              experience: 'expe',
              proficiency: 'intermediate'
            }
          ]
      
    });

    //this.logValidationErrors(this.employeeForm);
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    //console.log(group.controls);
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';

      if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for(const errorKey in abstractControl.errors) {
          this.formErrors[key] += messages[errorKey] + ' ';
        }
      }

      if(abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

      if(abstractControl instanceof FormArray) {
          for(const control of abstractControl.controls) {
              if(control instanceof FormGroup) {
                  this.logValidationErrors(control);
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
    const emailControl = this.employeeForm.get('emailGroup');

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

  onFormArrayClick(): void {
      // this.employeeForm = new FormGroup({
      //   fullName: new FormControl(),
      //   email: new FormControl(),
      //   skills: new FormGroup({
      //     skillName: new FormControl(),
      //     experience: new FormControl(),
      //     proficiency: new FormControl()
      //   })
      // });
      const formArray = new FormArray([
          new FormControl('John', Validators.required),
          new FormGroup({
              contry: new FormControl('', Validators.required)
          }),
          new FormArray([])
      ]);

      console.log(formArray.length);

      const formArray1 = this.fb.array([
          new FormControl('John', Validators.required),
          new FormControl('IT', Validators.required),
          new FormControl('', Validators.required)
      ]);

      formArray1.push(new FormControl('test', Validators.required));

      console.log(formArray1.value, formArray1.valid, formArray1.at(3));
  }

  addSkillFormGroup(): FormGroup {
      return this.fb.group({
        skillName: ['', Validators.required],
        experience: ['', Validators.required],
        proficiency: ['', Validators.required]
      });
  }

  addSkillButtonClick(): void {
      (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  removeSkillGroupClick(index: number): void {
    (<FormArray>this.employeeForm.get('skills')).removeAt(index);
  }
}

function matchEmail(group: AbstractControl): {[key: string]: any} | null {

    const emailControl = group.get('email');
    const confirmEmailControl = group.get('confirmEmail');
    console.log("email=",emailControl.value, confirmEmailControl.value);
    if(emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
        return null;
    } else {
        return {'emailMisMatch': true};
    }
}
