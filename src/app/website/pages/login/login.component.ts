import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.email,
    ]],
    password: ['', Validators.required],
  });
  hide = true;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    console.log('hello world');
  }

  onSubmit() {
  }

}
