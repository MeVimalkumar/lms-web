import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { EmailField } from 'src/app/constants/email';
import { PasswordField } from 'src/app/constants/password';
import { HttpMethods } from 'src/app/enums/http-methods';
import { User } from 'src/app/schemas/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailField = EmailField;
  passwordField = PasswordField;
  loginForm: FormGroup = Object.create({})

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private utilService: UtilService,
    private authService: AuthService,
    private storageService: StorageService) {
    this.initForm()
  }

  async submitHandler(e: SubmitEvent, form: FormGroup) {
    try {
      if (this.utilService.isFormValid(form)) {
        let resp = await firstValueFrom(this.apiService.request({ path: 'login', method: HttpMethods.POST, body: form.getRawValue() }))
        if (resp.status === 200) {
          this.storageService.saveToken(resp.body?.token);
          resp = await firstValueFrom(this.apiService.request({ path: 'user/me' }))
          if (resp.status === 200) {
            this.authService.setUser(resp.body)
          }
          this.router.navigate([this.authService.returnUrl]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  initForm(user?: User) {
    this.loginForm = this.fb.group({
      email: [user?.email || '', [Validators.required, Validators.pattern(this.emailField.pattern), Validators.minLength(this.emailField.minlength), Validators.maxLength(this.emailField.maxlength)]],
      password: [user?.password || '', [Validators.required, Validators.pattern(this.passwordField.pattern), Validators.minLength(this.passwordField.minlength), Validators.maxLength(this.passwordField.maxlength)]],
    })
  }
}
