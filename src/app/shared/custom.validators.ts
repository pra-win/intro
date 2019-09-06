import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static emailDomain (doaminName: string ) {
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
}