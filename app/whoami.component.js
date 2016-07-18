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
var WhoAmIComponent = (function () {
    function WhoAmIComponent() {
    }
    WhoAmIComponent.prototype.startTimer = function () {
        document.getElementById("gamewindow").innerHTML = "<center><div id ='delay'>GET READY...</div></center>";
        setTimeout(this.initQuestions(), 500);
    };
    WhoAmIComponent.prototype.initQuestions = function () {
        //TODO: Generate Question
        //TODO: Fetch 4 answers from Watson
        var question = '';
        var answers = ['', '', '', ''];
        var question_count = 0;
        var maximum_question_count = 15;
        var answers_given = [];
        var next = function (ans) {
            question_count = question_count + 1;
            if (question_count > maximum_question_count) {
                document.getElementById("gamewindow").innerHTML =
                    "Your answers: " + answers_given + "<br>Some stats<br>\
                                <button class='button' id='pa'>Play Again (TODO)</button>";
                document.getElementById("pa").onclick = function () { alert("To be implemented"); };
            }
            else {
                if (ans != -1) {
                    // TODO ------- save answer
                    answers_given.push(ans);
                }
                // TODO ------- fetch question + answers
                answers = ['Peter Parker', 'Natalia Alianovna', 'Anthony Edward Stark', 'Wanda Maximoff'];
                question = 'What is the real name of Black Widow?';
                if (question_count % 2 == 0) {
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
        };
        document.getElementById("gamewindow").innerHTML = "<center><div id=question_num></div><br><div id=question></div><br>\
        <button class='button' id='ans1'></button>\
        <button class='button' id='ans2'></button>\
        <button class='button' id='ans3'></button>\
        <button class='button' id='ans4'></button></center>";
        document.getElementById("ans1").onclick = function () { next(1); };
        document.getElementById("ans2").onclick = function () { next(2); };
        document.getElementById("ans3").onclick = function () { next(3); };
        document.getElementById("ans4").onclick = function () { next(4); };
        next(-1);
    };
    WhoAmIComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/html/whoami.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], WhoAmIComponent);
    return WhoAmIComponent;
}());
exports.WhoAmIComponent = WhoAmIComponent;
//# sourceMappingURL=whoami.component.js.map