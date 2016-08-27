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
        return this.http.post('https://watson-wdc01.ihost.com/instance/518/deepqa/v1/question',params,{headers: headers}).map(res => res.json())
    }
    postJSON_tutorial(){
        // test method for post request
        // works perfectly fine
        var json = JSON.stringify({var1: 'test', var2: 3, var3: "asdas"});
        var params = 'json=' + json;
        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        return this.http.post('http://validate.jsontest.com',params,{headers: headers})
    }
    postJSON_tutorial2(){
        var json = JSON.stringify({var1: 'test', var2: 3, var3: "asdas"});
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('http://validate.jsontest.com',json,{headers: headers})
    }
    
    getJSON_tutorial(){
        // test method for get request
        // works perfectly fine
        return this.http.get('http://jsonplaceholder.typicode.com/posts/1')
    }
    */
    /* http POST request to get the answer of watson to a specific question
     */
    HTTPService.prototype.ask_watson = function (question) {
        var _this = this;
        var params = question;
        var headers = new http_1.Headers();
        headers.append('Filepath', 'C:/Users/shameless/Desktop/angular2-tour-of-heroes/response.json');
        return this.http.post('http://localhost:8080/Marvel-QA-be/watsonqa/submit/postQuestion', params, { headers: headers })
            .map(function (res) { })
            .flatMap(function () { return _this.http.get('./response.json'); });
    };
    /* Requesting Questions that are required for the game
     */
    HTTPService.prototype.get_question_watson = function () {
        return this.http.get('http://localhost:8080/Marvel-QA-be/watsonqa/sql/watsonquizresponse');
    };
    /* http POST request to add a question to the db
     */
    HTTPService.prototype.add_question_to_db = function (question) {
        var params = question;
        var headers = new http_1.Headers();
        return this.http.post('http://localhost:8080/Marvel-QA-be/watsonqa/sql/addingQuestions', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    HTTPService.prototype.get_highscore_list = function () {
        return this.http.get('http://localhost:8080/Marvel-QA-be/watsonqa/sql/highscore');
    };
    HTTPService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HTTPService);
    return HTTPService;
}());
exports.HTTPService = HTTPService;
//# sourceMappingURL=http.service.js.map