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
require("rxjs/add/operator/map");
var HTTPService = (function () {
    function HTTPService(http) {
        this.http = http;
    }
    /*
    postJSON(){
        var json = JSON.stringify({"question":{"questionText" : "Who is Nick fury?"}});
        var params = 'json=' + json;
        var headers = new Headers();
        headers.append('X-SyncTimeout','30');
        headers.append('Accept','application/json');
        headers.append('Cache-Control','no-cache');
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Basic dHVkX21hbmFnZXIxOldtc1dpZW1j');
        
        return this._http.post('https://watson-wdc01.ihost.com/instance/518/deepqa/v1/question',params,{headers: headers}).map(res => res.json())
    }*/
    HTTPService.prototype.test = function () {
        return 'success';
    };
    HTTPService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HTTPService);
    return HTTPService;
}());
exports.HTTPService = HTTPService;
//# sourceMappingURL=http.service.js.map