import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  // check for form data is valid or not
  // Highlight error field
  isFormValid(form: FormGroup) {
    for (var name in form.controls) {
      if (form.controls[name].invalid) {
        if (!document.getElementById(name)) {
          continue;
        }
        window.setTimeout(function () {
          document?.getElementById(name)?.focus();
        }, 0);
        form.controls[name].markAsDirty();
        form.controls[name].markAsTouched();
        return false;
      }
    }
    return true;
  }
}
