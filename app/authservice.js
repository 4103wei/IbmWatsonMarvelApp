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
var http_1 = require('@angular/http');
var md5_1 = require('./md5');
var AuthService = (function () {
    function AuthService(_http) {
        this._http = _http;
    }
    AuthService.prototype.loginfn = function (user, pw) {
        var _this = this;
        var creds = 'name=' + user + '&password=' + pw;
        var headers = new http_1.Headers();
        headers.append('Authentication', creds);
        var options = new RequestOptions({ headers: headers });
        this.http.get(this.url + '/Marvel-QA-be/watsonqa/sql/addingScore', options).map(res).subscribe(function (res) {
        }, function (err) { return _this.status = 'Could not initialize the questions.'; }, function () { return console.log('Completed'); });
        ;
        window.localStorage.setItem('Authentication', md5_1.md5(creds));
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=authservice.js.map