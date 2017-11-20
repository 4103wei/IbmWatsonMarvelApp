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
var loginfodata_1 = require('./loginfodata');
var AddQuestionsComponent = (function () {
    function AddQuestionsComponent(httpService) {
        this.httpService = httpService;
        this.notification = '';
        this.addquestionbox = '';
        this.selected = [];
    }
    AddQuestionsComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('user') != loginfodata_1.AUTH["user_auth"] || localStorage.getItem('pw') != loginfodata_1.AUTH["pw_auth"]) {
            window.location.assign('/login');
        }
    };
    // receiving key event
    AddQuestionsComponent.prototype.eventHandler = function (key) {
        var _this = this;
        if (key == 13 && this.addquestionbox != '') {
            document.getElementById("addquestioncontent").innerHTML = "<center><div id ='delay'>Loading...</div></center>";
            this.httpService.get_possible_answers(this.addquestionbox).map(function (res) { return res.json(); }).subscribe(function (res) {
                //console.log(res);
                _this.specifyPage(res);
            }, function (err) { return console.log("Question could not be submitted."); }, function () { return console.log('Completed'); });
        }
    };
    AddQuestionsComponent.prototype.specifyPage = function (jsonobj) {
        var _this = this;
        // setting up template to be submitted
        document.getElementById("addquestioncontent").innerHTML = "<h3>Add Questions</h3><div class='question'>" + this.addquestionbox + "</div><div id='o0'>undefined</div><div class='addwrong' id='o1'>undefined</div><div class='addwrong' id='o2'>undefined</div><div class='addwrong' id='o3'>undefined</div><br>";
        document.getElementById("addquestioncontent").innerHTML =
            document.getElementById("addquestioncontent").innerHTML +
                "<div class='addmenucontrol'>" +
                "<button class='button' id='cancelbutton'>Cancel</button> " +
                "<button class='button' id='clearbutton'>Clear</button> " +
                "<button class='button' id='addbutton'>Add Question</button>" +
                "</div><hr>";
        if (jsonobj["length"] == 0) {
            document.getElementById("addquestioncontent").innerHTML =
                document.getElementById("addquestioncontent").innerHTML +
                    "No entities could be extracted from your question, please try another question or consider rewording your question. Press 'Cancel' to return.";
        }
        // go through every sentenceAnswers
        for (var i = 0; i < jsonobj["length"]; i++) {
            // extracting each obj info
            var confidence = jsonobj["sentenceAnswers"][i]["confidence"];
            var namedEntities = jsonobj["sentenceAnswers"][i]["namedEntities"]; // Array
            var sentence = jsonobj["sentenceAnswers"][i]["sentence"];
            // display sentence
            document.getElementById("addquestioncontent").innerHTML =
                document.getElementById("addquestioncontent").innerHTML + "<div class='sentence'>" + sentence + "</div>";
            // display confidence
            document.getElementById("addquestioncontent").innerHTML =
                document.getElementById("addquestioncontent").innerHTML + "<div class='confidence'>Confidence: " + confidence + "</div>";
            // display every named entity for this sentence
            for (var k = 0; k < namedEntities["length"]; k++) {
                document.getElementById("addquestioncontent").innerHTML =
                    document.getElementById("addquestioncontent").innerHTML +
                        "<button class='button selectable' id='selectable" + i.toString() + "_" + k.toString() + "'>" + namedEntities[k] + "</button> ";
            }
        }
        // adding onclicks
        for (var i = 0; i < jsonobj["length"]; i++) {
            var namedEntities = jsonobj["sentenceAnswers"][i]["namedEntities"]; // Array
            var _loop_1 = function(k) {
                var id = "selectable" + i.toString() + "_" + k.toString();
                document.getElementById(id).onclick = function () {
                    //check whether or not the clicked button is already in the chosen answers
                    var contain = false;
                    for (var t = 0; t < _this.selected.length; t++) {
                        if (document.getElementById(_this.selected[t]).innerHTML == document.getElementById(id).innerHTML)
                            contain = true;
                    }
                    if (_this.selected.length < 4 && !contain)
                        _this.selected.push(id); // saving the answer
                    for (var b = 0; b < _this.selected.length; b++) {
                        var id_1 = "o" + b.toString();
                        document.getElementById(id_1).innerHTML = document.getElementById(_this.selected[b]).innerHTML;
                    }
                };
            };
            for (var k = 0; k < namedEntities["length"]; k++) {
                _loop_1(k);
            }
        }
        // cancel button onclick
        document.getElementById("cancelbutton").onclick = function () { location.reload(); };
        // clear button onclick
        document.getElementById("clearbutton").onclick = function () {
            _this.selected = [];
            //reset view
            document.getElementById("o0").innerHTML = "undefined";
            document.getElementById("o1").innerHTML = "undefined";
            document.getElementById("o2").innerHTML = "undefined";
            document.getElementById("o3").innerHTML = "undefined";
        };
        // add button onclick
        document.getElementById("addbutton").onclick = function () {
            //{"question":"who is spider-man?","correct":"Peter Parker","wrong_1":"Spider-Man","wrong_2":"Tony Stark","wrong_3":"Iron Man"}
            if (_this.selected.length == 4) {
                var jsonstringresult_1 = '{"question":"' + _this.addquestionbox + '","correct":"' + document.getElementById(_this.selected[0]).innerHTML + '","wrong_1":"' + document.getElementById(_this.selected[1]).innerHTML + '","wrong_2":"' + document.getElementById(_this.selected[2]).innerHTML + '","wrong_3":"' + document.getElementById(_this.selected[3]).innerHTML + '"}';
                _this.httpService.add_question_to_db(jsonstringresult_1).map(function (res) { return res.json(); }).subscribe(function (res) { return console.log(jsonstringresult_1 + " added"); }, function (err) { return console.log(jsonstringresult_1 + " added"); }, function () { return console.log('Completed'); });
                location.reload();
            }
        };
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