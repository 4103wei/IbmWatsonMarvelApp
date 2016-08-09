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
var http_service_1 = require('./http.service');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require("rxjs/add/operator/map");
require('rxjs/add/operator/mergeMap');
var AddQuestionsComponent = (function () {
    function AddQuestionsComponent(httpService) {
        this.httpService = httpService;
        this.notification = '';
        this.addquestionbox = '';
    }
    AddQuestionsComponent.prototype.eventHandler = function (key) {
        var _this = this;
        if (key == 13 && this.addquestionbox != '') {
            this.notification = 'Your question: "' + this.addquestionbox + '" has been submitted.';
            this.httpService.add_question_to_db(this.addquestionbox).map(function (res) { return res.json(); }).subscribe(function (res) { return _this.notification = _this.notification; }, function (err) { return _this.notification = _this.notification; }, function () { return console.log('Completed'); });
            this.addquestionbox = '';
        }
        else {
            this.notification = '';
        }
    };
    AddQuestionsComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/html/addquestions.component.html',
            providers: [http_1.HTTP_PROVIDERS, http_service_1.HTTPService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HTTPService])
    ], AddQuestionsComponent);
    return AddQuestionsComponent;
}());
exports.AddQuestionsComponent = AddQuestionsComponent;
//# sourceMappingURL=addquestions.component.js.map