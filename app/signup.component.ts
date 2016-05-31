import {Component} from '@angular/core';
import {FormBuilder, Validators, ControlGroup} from '@angular/common';

@Component({
  selector: 'signup-page',
  templateUrl: 'app/html/signup-page.html'
})


export class SignupComponent {
  signupForm: ControlGroup;
    

  constructor(fb: FormBuilder) {
    this.signupForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
    doSignup(data) {
        //console.log(this.loginForm.value);
        //event.preventDefault();
        alert(data.email);
    }
}