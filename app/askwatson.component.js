//import { Component, OnInit  } from '@angular/core';
//import {HTTPService} from './http.service';
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
        
        headers.append('Authorization', 'Basic ' + btoa('tud_manager1:WmsWiemc'));
        return this._http.post('https://watson-wdc01.ihost.com/instance/518/deepqa/v1/question',params,{headers: headers}).map(res => res.json())
    }*/
    HTTPService.prototype.test = function () {
        /*
        var json = JSON.stringify({var1: 'test', var2: 3});
        var params = 'json=' + json;
        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        return this.http.post('http://validate.jsontest.com',params,{headers: headers}).map(res => res.json())
        */
        return this.http.get('http://jsonplaceholder.typicode.com/posts/1').map(function (res) { return res.json(); });
    };
    HTTPService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HTTPService);
    return HTTPService;
}());
var AskWatsonComponent = (function () {
    function AskWatsonComponent(httpService) {
        this.httpService = httpService;
        this.question = '';
        this.view_question = '';
        this.view_answer = '';
    }
    AskWatsonComponent.prototype.eventHandler = function (key) {
        if (key == 13) {
            this.view_question = this.question;
            //this.view_answer = this.reqAns(this.question);
            this.reqAns(this.question);
            this.question = '';
        }
    };
    AskWatsonComponent.prototype.reqAns = function (question) {
        // TODO: watson does something with the question
        // this.view_answer = ...
        var _this = this;
        if (question == '') {
            return '';
        }
        else {
            this.httpService.test()
                .subscribe(function (data) { return _this.view_answer = JSON.stringify(data); }, function (error) { return alert(error); }, function () { return console.log("finished"); });
        }
    };
    AskWatsonComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/html/askwatson.component.html',
            providers: [http_1.HTTP_PROVIDERS, HTTPService]
        }), 
        __metadata('design:paramtypes', [HTTPService])
    ], AskWatsonComponent);
    return AskWatsonComponent;
}());
exports.AskWatsonComponent = AskWatsonComponent;
//# sourceMappingURL=askwatson.component.js.map