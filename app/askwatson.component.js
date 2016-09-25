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
require('rxjs/add/operator/mergeMap');
var http_service_1 = require('./http.service');
var router_1 = require('@angular/router');
var loginfodata_1 = require('./loginfodata');
var AskWatsonComponent = (function () {
    /*
    private answer = '{"1":{"specific_answer":"spider-man", "paragraph":"spider-mans real name is peter parker. He is 15 years old and...", "confidence": "0.54"},\
                    "2":{"specific_answer":"tony stark", "paragraph":"iron real name is peter parker. He is 45 years old and...", "confidence": "0.34"}\
                    }';
    */
    function AskWatsonComponent(httpService) {
        this.httpService = httpService;
        this.question = '';
        this.view_question = '...';
        this.view_answer = 'Ask me something.';
    }
    AskWatsonComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('user') != loginfodata_1.AUTH["user_auth"] || localStorage.getItem('pw') != loginfodata_1.AUTH["pw_auth"]) {
            window.location.assign('/login');
        }
    };
    /* Triggers when ENTER is pressed
     */
    AskWatsonComponent.prototype.eventHandler = function (key) {
        if (key == 13) {
            this.view_question = this.question;
            this.reqAns(this.question);
            this.question = '';
        }
    };
    /* Requesting an answer from watson
     * Improvement: If Watson doesn't have an answer, then return "I don't know what you mean."
     */
    AskWatsonComponent.prototype.reqAns = function (question) {
        var _this = this;
        if (question == '') {
            this.view_question = '...';
            document.getElementById('ask_watson_answer').innerHTML = 'Ask me something.';
        }
        else {
            this.view_answer = '(thinking...)';
            this.httpService.ask_watson(question).map(function (res) { return res.json(); }).subscribe(function (res) { if (res.question.evidencelist[0].hasOwnProperty('text')) {
                _this.view_answer = JSON.stringify(res.question.evidencelist[0].text);
            }
            else {
                _this.view_answer = JSON.stringify(res.question.evidencelist[1].text);
            } }, function (err) { return _this.view_answer = "error:" + JSON.stringify(err); }, function () { return console.log('Completed'); });
        }
    };
    AskWatsonComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/html/askwatson.component.html',
            providers: [http_1.HTTP_PROVIDERS, http_service_1.HTTPService, router_1.ROUTER_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [http_service_1.HTTPService])
    ], AskWatsonComponent);
    return AskWatsonComponent;
}());
exports.AskWatsonComponent = AskWatsonComponent;
//# sourceMappingURL=askwatson.component.js.map