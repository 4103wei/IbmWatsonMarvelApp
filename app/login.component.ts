import {Component} from '@angular/core';
import {FormBuilder, Validators, ControlGroup } from '@angular/common';
import {AuthService} from './authservice';
import {HTTP_PROVIDERS} from '@angular/http';
import {AUTH} from './loginfodata';


@Component({
    selector: 'login-page',
    templateUrl: 'app/html/login-page.html',
    providers: [HTTP_PROVIDERS,AuthService]
})


export class LoginComponent {        
    loginForm: ControlGroup;
    
    constructor(private _service:AuthService, fb: FormBuilder) {
        this.loginForm = fb.group({
        user: ["", Validators.required],
        password: ["", Validators.required]
        });
    }
    
    ngOnInit(){
        if (localStorage.getItem('user') == AUTH["user_auth"] && localStorage.getItem('pw') == AUTH["pw_auth"]){
            window.location.assign('/logout');
        }
    }
    
    login(data) {
        this._service.loginfn(data.user, data.password);  
        
        if (localStorage.getItem('user') == AUTH["user_auth"] && localStorage.getItem('pw') == AUTH["pw_auth"]){
            window.location.href='/logout';
            console.log("logged in");
        }else{
            window.location.href='/login';
        }
    }
}