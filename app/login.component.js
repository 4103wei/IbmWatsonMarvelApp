"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var authservice_1 = require('./authservice');
var http_1 = require('@angular/http');
var loginfodata_1 = require('./loginfodata');
var LoginComponent = (function () {
    function LoginComponent(_service, fb) {
        this._service = _service;
        this.loginForm = fb.group({
            user: ["", common_1.Validators.required],
            password: ["", common_1.Validators.required]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('user') == loginfodata_1.AUTH["user_auth"] && localStorage.getItem('pw') == loginfodata_1.AUTH["pw_auth"]) {
            window.location.assign('/logout');
        }
    };
    LoginComponent.prototype.login = function (data) {
        this._service.loginfn(data.user, data.password);
        if (localStorage.getItem('user') == loginfodata_1.AUTH["user_auth"] && localStorage.getItem('pw') == loginfodata_1.AUTH["pw_auth"]) {
            window.location.href = '/logout';
            console.log("logged in");
        }
        else {
            window.location.href = '/login';
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-page',
            templateUrl: 'app/html/login-page.html',
            providers: [http_1.HTTP_PROVIDERS, authservice_1.AuthService]
        }), 
        __metadata('design:paramtypes', [authservice_1.AuthService, common_1.FormBuilder])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map