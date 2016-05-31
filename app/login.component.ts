import {Component} from '@angular/core';
import {FormBuilder, Validators, ControlGroup } from '@angular/common';

@Component({
    selector: 'login-page',
    templateUrl: 'app/html/login-page.html'
})


export class LoginComponent {        
  loginForm: ControlGroup;
    

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
         
    
  doLogin(data) {
    alert(data.email)
  }
}