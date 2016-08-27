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
var WhoAmIComponent = (function () {
    function WhoAmIComponent(httpService) {
        this.httpService = httpService;
        this.jsonstring = '';
        this.jsonarray = null;
        this.maxquestioncount = 15;
        this.questioncount = 1;
    }
    /* Do a http GET request to fetch the question needed for the quiz
     * The result should be in JSON format
     */
    WhoAmIComponent.prototype.fetchQuestion = function () {
        var _this = this;
        this.httpService.get_question_watson().map(function (res) { return res.json(); }).subscribe(function (res) { return _this.jsonstring = JSON.stringify(res); }, function (err) { return console.log('Error'); }, function () { return console.log('Completed'); });
    };
    /* Start a timer, the game starts after the countdown.
     */
    WhoAmIComponent.prototype.startTimer = function () {
        var _this = this;
        this.fetchQuestion();
        document.getElementById("gamewindow").innerHTML = "<center><div id ='delay'>GET READY...</div></center>";
        setTimeout(function () { _this.initQuestions(); }, 1000);
    };
    /* initialize a question
     * param: int id - id of the question&answer set that have to be initialized
     */
    WhoAmIComponent.prototype.qinit = function (id) {
        var _this = this;
        document.getElementById("gamewindow").innerHTML = "<center><div id=question_num></div><br><div id=question></div><br>\
        <button class='button' id='ans1'></button>\
        <button class='button' id='ans2'></button>\
        <button class='button' id='ans3'></button>\
        <button class='button' id='ans4'></button></center>";
        document.getElementById("ans1").onclick = function () { _this.qinit(id + 1); };
        document.getElementById("ans2").onclick = function () { _this.qinit(id + 1); };
        document.getElementById("ans3").onclick = function () { _this.qinit(id + 1); };
        document.getElementById("ans4").onclick = function () { _this.qinit(id + 1); };
        document.getElementById("question_num").innerHTML = id.toString() + " of " + this.maxquestioncount.toString();
        document.getElementById("question").innerHTML = this.jsonarray[id.toString()]["question"];
        document.getElementById("ans1").innerHTML = this.jsonarray[id.toString()]["correct"];
        document.getElementById("ans2").innerHTML = this.jsonarray[id.toString()]["wrong_1"];
        document.getElementById("ans3").innerHTML = this.jsonarray[id.toString()]["wrong_2"];
        document.getElementById("ans4").innerHTML = this.jsonarray[id.toString()]["wrong_3"];
    };
    /* Game logic
     */
    WhoAmIComponent.prototype.initQuestions = function () {
        this.jsonarray = JSON.parse(this.jsonstring);
        this.qinit(this.questioncount);
        /*
        //TODO: Generate Question
        //TODO: Fetch 4 answers from Watson
        var question = '';
        var answers = ['', '', '', ''];
        var question_count = 0;
        var maximum_question_count = 15;
        var answers_given = [];
    
        var next = function(ans){
                        question_count = question_count + 1;
                        if (question_count > maximum_question_count){
                            document.getElementById("gamewindow").innerHTML =
                                "Your answers: " + answers_given + "<br>Some stats<br>\
                                <button class='button' id='pa'>Play Again (TODO)</button>";
                            
                            document.getElementById("pa").onclick= function(){alert("To be implemented")};
                        }else{
                            if(ans != -1){
                                // TODO ------- save answer
                                answers_given.push(ans);
                            }

                            // TODO ------- fetch question + answers
                            answers = ['Peter Parker', 'Natalia Alianovna', 'Anthony Edward Stark', 'Wanda Maximoff'];
                            question = 'What is the real name of Black Widow?';
                            if (question_count % 2 == 0){
                            answers = ['45', '27', '38', '22'];
                            question = 'How old is Hawkeye?';
                            }
                            //------------------
                            document.getElementById("question_num").innerHTML = question_count.toString() + " of " + maximum_question_count.toString();
                            document.getElementById("question").innerHTML = question;
                            document.getElementById("ans1").innerHTML = answers[0];
                            document.getElementById("ans2").innerHTML = answers[1];
                            document.getElementById("ans3").innerHTML = answers[2];
                            document.getElementById("ans4").innerHTML = answers[3];
                        }
                    }
        document.getElementById("gamewindow").innerHTML = "<center><div id=question_num></div><br><div id=question></div><br>\
        <button class='button' id='ans1'></button>\
        <button class='button' id='ans2'></button>\
        <button class='button' id='ans3'></button>\
        <button class='button' id='ans4'></button></center>";
        document.getElementById("ans1").onclick= function(){next(1)};
        document.getElementById("ans2").onclick= function(){next(2)};
        document.getElementById("ans3").onclick= function(){next(3)};
        document.getElementById("ans4").onclick= function(){next(4)};
        next(-1);
    */
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