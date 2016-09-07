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
        this.url = 'http://localhost:8080';
    }
    /* http GET to request the answer to a specific question from the back-end
     */
    HTTPService.prototype.ask_watson = function (question) {
        var headers = new http_1.Headers({ "Question": question });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.url + '/Marvel-QA-be/watsonqa/submit/getAnswer', options);
    };
    /* http GET to requesti JSONs that are required for the game
     */
    HTTPService.prototype.get_question_watson = function () {
        return this.http.get(this.url + '/Marvel-QA-be/watsonqa/sql/watsonquizresponse');
    };
    /* http POST to request adding a question to the db
     */
    HTTPService.prototype.add_question_to_db = function (question) {
        var params = question;
        var headers = new http_1.Headers();
        return this.http.post(this.url + '/Marvel-QA-be/watsonqa/sql/addingQuestions', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    /* http GET to request the highscore leaderboard
     */
    HTTPService.prototype.get_highscore_list = function () {
        return this.http.get(this.url + '/Marvel-QA-be/watsonqa/sql/highscore');
    };
    /* http GET to request adding a highscore to the leaderboard
     */
    HTTPService.prototype.add_highscore = function (name, score) {
        var headers = new http_1.Headers();
        headers.append('Name', name);
        headers.append('Score', score);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.url + '/Marvel-QA-be/watsonqa/sql/addingScore', options);
    };
    HTTPService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HTTPService);
    return HTTPService;
}());
exports.HTTPService = HTTPService;
//# sourceMappingURL=http.service.js.map