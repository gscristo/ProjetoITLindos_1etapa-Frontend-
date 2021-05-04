import { AbstractControl } from "@angular/forms";

export class CustomValidator {
  // Validates URL
  static urlValidator(url): any {
     if (url.pristine) {
        return null;
     }
     const URL_REGEXP = /^(http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
     url.markAsTouched();
     if (URL_REGEXP.test(url.value)) {
        return null;
     }
     return {
        invalidUrl: true
     };
  }
  // Validates hour 00:00
  static hourValidator(hour): any {
      if (hour.pristine) {
          return null;
       }
       const HOUR_REGEXP = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
       hour.markAsTouched();
       if (HOUR_REGEXP.test(hour.value)) {
          return null;
       }
       return {
          invalidhour: true
       };
  }
  // Validates passwords
  static matchPassword(group): any {
     const password = group.controls.password;
     const confirm = group.controls.confirm;
     if (password.pristine || confirm.pristine) {
        return null;
     }
     group.markAsTouched();
     if (password.value === confirm.value) {
        return null;
     }
     return {
        invalidPassword: true
     };
  }
  // Validates dates for Accounts
  static matchValidityAccount(group: AbstractControl): any {
     const initial = group.get('startDate');
     const end = group.get('endDate');

     if (initial.value < end.value) {
       return null;
      }
      if (!end.value){
        return null;
      }
     return {
        invalidDates: true
     };
  }
  // Validates numbers
  static numberValidator(number): any {
     if (number.pristine) {
        return null;
     }
     const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;
     number.markAsTouched();
     if (NUMBER_REGEXP.test(number.value)) {
        return null;
     }
     return {
        invalidNumber: true
     };
  }
  // Validates US SSN
  static ssnValidator(ssn): any {
     if (ssn.pristine) {
        return null;
     }
     const SSN_REGEXP = /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/;
     ssn.markAsTouched();
     if (SSN_REGEXP.test(ssn.value)) {
        return null;
     }
     return {
        invalidSsn: true
     };
  }
  // Validates US phone numbers
  static phoneValidator(number): any {
     if (number.pristine) {
        return null;
     }
     const PHONE_REGEXP = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
     number.markAsTouched();
     if (PHONE_REGEXP.test(number.value)) {
        return null;
     }
     return {
        invalidNumber: true
     };
  }
  // Validates zip codes
  static zipCodeValidator(zip): any {
     if (zip.pristine) {
        return null;
     }
     const ZIP_REGEXP = /^[0-9]{5}(?:-[0-9]{4})?$/;
     zip.markAsTouched();
     if (ZIP_REGEXP.test(zip.value)) {
        return null;
     }
     return {
        invalidZip: true
     };
  }
  }
