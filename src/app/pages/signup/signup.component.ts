import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { EmailField } from 'src/app/constants/email';
import { NameField } from 'src/app/constants/name';
import { PasswordField } from 'src/app/constants/password';
import { HttpMethods } from 'src/app/enums/http-methods';
import { User } from 'src/app/schemas/user';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  nameField = NameField;
  emailField = EmailField;
  passwordField = PasswordField;
  signUpForm: FormGroup = Object.create({})

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private utilService: UtilService) {
    this.initForm()
  }

  async submitHandler(e: SubmitEvent, form: FormGroup) {
    try {
      if (this.utilService.isFormValid(form)) {
        const resp = await firstValueFrom(this.apiService.request({ path: 'signup', method: HttpMethods.POST, body: form.getRawValue() }))
        if (resp.status === 201) {
          this.router.navigate(['/login'])
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  initForm(user?: User) {
    this.signUpForm = this.fb.group({
      name: [user?.name || '', [Validators.required, Validators.pattern(this.nameField.pattern), Validators.minLength(this.nameField.minlength), Validators.maxLength(this.nameField.maxlength)]],
      email: [user?.email || '', [Validators.required, Validators.pattern(this.emailField.pattern), Validators.minLength(this.emailField.minlength), Validators.maxLength(this.emailField.maxlength)]],
      password: [user?.password || '', [Validators.required, Validators.pattern(this.passwordField.pattern), Validators.minLength(this.passwordField.minlength), Validators.maxLength(this.passwordField.maxlength)]],
    })
  }

}
