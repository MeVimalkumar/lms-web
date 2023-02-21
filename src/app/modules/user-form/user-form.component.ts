import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmailField } from 'src/app/constants/email';
import { NameField } from 'src/app/constants/name';
import { User } from 'src/app/schemas/user';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup = Object.create(null)
  nameField = NameField;
  emailField = EmailField;
  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private utilService: UtilService,
  ) { }

  ngOnInit(): void {
    this.initForm(this.config.data)
  }

  submitHandler(e: SubmitEvent, form: FormGroup) {
    if (this.utilService.isFormValid(form)) {
      this.ref.close(form.getRawValue())
    }
  }

  initForm(user: User) {
    this.userForm = this.fb.group({
      userId: [user?.userId || null],
      name: [user?.name || '', [Validators.required, Validators.pattern(this.nameField.pattern), Validators.minLength(this.nameField.minlength), Validators.maxLength(this.nameField.maxlength)]],
      email: [user?.email || '', [Validators.required, Validators.pattern(this.emailField.pattern), Validators.minLength(this.emailField.minlength), Validators.maxLength(this.emailField.maxlength)]]
    })
  }
}
