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
var loginfodata_1 = require('./loginfodata');
var LogoutComponent = (function () {
    function LogoutComponent() {
    }
    LogoutComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('user') != loginfodata_1.AUTH["user_auth"] || localStorage.getItem('pw') != loginfodata_1.AUTH["pw_auth"]) {
            window.location.assign('/login');
        }
    };
    LogoutComponent.prototype.logout = function () {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('pw');
        window.location.href = '/login';
        console.log("logged out");
    };
    LogoutComponent = __decorate([
        core_1.Component({
            selector: 'logout',
            templateUrl: 'app/html/logout-page.html'
        }), 
        __metadata('design:paramtypes', [])
    ], LogoutComponent);
    return LogoutComponent;
}());
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=logout.component.js.map