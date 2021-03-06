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
var loginfodata_1 = require('./loginfodata');
var WhoAmIComponent = (function () {
    function WhoAmIComponent(httpService) {
        this.httpService = httpService;
        this.status = '';
        this.jsonstring = '';
        this.jsonarray = null;
        this.maxquestioncount = 15;
        this.rannum = 0;
        this.questions = [];
        this.givenanswers = [];
        this.correctanswers = [];
        this.score = 0;
        this.namebox = '';
    }
    WhoAmIComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('user') != loginfodata_1.AUTH["user_auth"] || localStorage.getItem('pw') != loginfodata_1.AUTH["pw_auth"]) {
            window.location.assign('/login');
        }
    };
    /* Do a http GET request to fetch the question needed for the quiz
     * The result should be in JSON format
     */
    WhoAmIComponent.prototype.fetchQuestion = function () {
        var _this = this;
        this.httpService.get_question_watson().map(function (res) { return res.json(); }).subscribe(function (res) { _this.jsonstring = JSON.stringify(res); _this.initQuestions(); }, function (err) { return _this.status = 'Could not initialize the questions.'; }, function () { return console.log('Completed'); });
    };
    /* This method uses the httpService to do a GET request to update the leaderboard.
     */
    WhoAmIComponent.prototype.addScore = function (name, score) {
        this.httpService.add_highscore(name, score).map(function (res) { return res.json(); }).subscribe(function (res) { return console.log('Completed'); }, function (err) { return console.log('Completed'); });
    };
    /* Start a timer, the game starts after the countdown.
     */
    WhoAmIComponent.prototype.startTimer = function () {
        document.getElementById("gamewindow").innerHTML = "<center><div id ='delay'>GET READY...</div></center>";
        this.fetchQuestion();
        //setTimeout(()=>{this.initQuestions();}, 60000);
    };
    /* initialize a question
     * param: int id - id of the question&answer set that have to be initialized
     */
    WhoAmIComponent.prototype.qinit = function (id) {
        var _this = this;
        var audio = new Audio();
        audio.src = "assets/button-3.mp3";
        audio.play();
        if (id > this.maxquestioncount) {
            // Game ended, evaluation
            // score
            var k = 0;
            while (k < this.maxquestioncount) {
                if (this.givenanswers[k] == this.correctanswers[k]) {
                    this.score = this.score + 100;
                }
                k++;
            }
            var i = 0;
            var evperquestion = '';
            while (i < this.maxquestioncount) {
                evperquestion = evperquestion + "<div class ='ev'><div class='evq'>The question is: " + this.questions[i] + "</div>" + "<div class ='evca'>The correct answer is: " + this.correctanswers[i] + "</div>" + "<div class ='evga'>Your answer was: " + this.givenanswers[i] + "</div></div>";
                i++;
            }
            document.getElementById("gamewindow").innerHTML = evperquestion + "<div class='evscore'>Score: " + this.score + "</div>" + "<button class='button' id='replay'>Replay</button>";
            document.getElementById("replay").onclick = function () { _this.startTimer(); };
            this.addScore(this.namebox, this.score.toString()); // add score to the leaderboard
        }
        else {
            this.rannum = Math.floor(Math.random() * 4); // {0,1,2,3}
            document.getElementById("gamewindow").innerHTML = "<center><div id=question_num></div><br><div class='question' id=question></div><br>\
            <button class='button answerbutton' id='ans0'></button>\
            <button class='button answerbutton' id='ans1'></button>\
            <button class='button answerbutton' id='ans2'></button>\
            <button class='button answerbutton' id='ans3'></button></center>";
            document.getElementById("ans0").onclick = function () { _this.givenanswers.push(document.getElementById("ans0").innerHTML); _this.qinit(id + 1); };
            document.getElementById("ans1").onclick = function () { _this.givenanswers.push(document.getElementById("ans1").innerHTML); _this.qinit(id + 1); };
            document.getElementById("ans2").onclick = function () { _this.givenanswers.push(document.getElementById("ans2").innerHTML); _this.qinit(id + 1); };
            document.getElementById("ans3").onclick = function () { _this.givenanswers.push(document.getElementById("ans3").innerHTML); _this.qinit(id + 1); };
            document.getElementById("question_num").innerHTML = id.toString() + " of " + this.maxquestioncount.toString();
            document.getElementById("question").innerHTML = this.jsonarray[id.toString()]["question"];
            document.getElementById("ans" + this.rannum.toString()).innerHTML = this.jsonarray[id.toString()]["correct"];
            document.getElementById("ans" + ((this.rannum + 1) % 4).toString()).innerHTML = this.jsonarray[id.toString()]["wrong_1"];
            document.getElementById("ans" + ((this.rannum + 2) % 4).toString()).innerHTML = this.jsonarray[id.toString()]["wrong_2"];
            document.getElementById("ans" + ((this.rannum + 3) % 4).toString()).innerHTML = this.jsonarray[id.toString()]["wrong_3"];
        }
    };
    /* Game logic
     */
    WhoAmIComponent.prototype.initQuestions = function () {
        // init game data
        this.jsonarray = JSON.parse(this.jsonstring);
        this.score = 0;
        this.givenanswers = [];
        this.correctanswers = [];
        this.questions = [];
        // init true answers and questions from game data
        var i = 1;
        while (i <= this.maxquestioncount) {
            this.correctanswers.push(this.jsonarray[i.toString()]["correct"]);
            this.questions.push(this.jsonarray[i.toString()]["question"]);
            i++;
        }
        // init quiz
        this.qinit(1);
    };
    WhoAmIComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/html/whoami.component.html',
            providers: [http_1.HTTP_PROVIDERS, http_service_1.HTTPService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HTTPService])
    ], WhoAmIComponent);
    return WhoAmIComponent;
}());
exports.WhoAmIComponent = WhoAmIComponent;
//# sourceMappingURL=whoami.component.js.map