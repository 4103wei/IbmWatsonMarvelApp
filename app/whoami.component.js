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
        document.getElementById("gamewindow").innerHTML = "<div id ='delay'>GET READY...</div>";
        setTimeout(initQuestions, 2000);
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
function initQuestions() {
    //TODO: Generate Question
    var question = 'What is the real name of Black Widow?';
    //TODO: Fetch 4 answers from Watson
    var answers = ['Peter Parker', 'Natalia Alianovna', 'Anthony Edward Stark', 'Wanda Maximoff'];
    document.getElementById("gamewindow").innerHTML = "<center><div id=question></div><br>\
        <button class='button' id='ans1'>Answer 1</button>\
        <button class='button' id='ans2'>Answer 2</button>\
        <button class='button' id='ans3'>Answer 3</button>\
        <button class='button' id='ans4'>Answer 4</button></center>";
    document.getElementById("ans1").onclick = function () { answerhandler(1); };
    document.getElementById("ans2").onclick = function () { answerhandler(2); };
    document.getElementById("ans3").onclick = function () { answerhandler(3); };
    document.getElementById("ans4").onclick = function () { answerhandler(4); };
    document.getElementById("question").innerHTML = question;
    document.getElementById("ans1").innerHTML = answers[0];
    document.getElementById("ans2").innerHTML = answers[1];
    document.getElementById("ans3").innerHTML = answers[2];
    document.getElementById("ans4").innerHTML = answers[3];
}
function answerhandler(answer) {
    // answer should be saved for the evaluation at the end
    alert(answer);
    // generate new question
    initQuestions();
}
//# sourceMappingURL=whoami.component.js.map