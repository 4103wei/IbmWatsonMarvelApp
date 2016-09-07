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
var HighscoreComponent = (function () {
    function HighscoreComponent(httpService) {
        this.httpService = httpService;
        this.TABLEHEADER = "<tr><th>Rank</th><th>Name</th><th>Score</th><th>Time</th></tr>";
        this.ENTRYSTART = "<tr>";
        this.ENTRYEND = "</tr>";
    }
    HighscoreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.httpService.get_highscore_list().map(function (res) { return res.json(); }).subscribe(function (res) { return document.getElementById("leaderboard").innerHTML = _this.TABLEHEADER +
            _this.ENTRYSTART + ("<td>1</td>" + "<td>" + JSON.stringify(res["1"]["name"]) + "</td>" + "<td>" + JSON.stringify(res["1"]["score"]) + "</td>" + "<td>" + JSON.stringify(res["1"]["date"]) + "</td>").split('"').join(" ") + _this.ENTRYEND +
            _this.ENTRYSTART + ("<td>2</td>" + "<td>" + JSON.stringify(res["2"]["name"]) + "</td>" + "<td>" + JSON.stringify(res["2"]["score"]) + "</td>" + "<td>" + JSON.stringify(res["2"]["date"]) + "</td>").split('"').join(" ") + _this.ENTRYEND +
            _this.ENTRYSTART + ("<td>3</td>" + "<td>" + JSON.stringify(res["3"]["name"]) + "</td>" + "<td>" + JSON.stringify(res["3"]["score"]) + "</td>" + "<td>" + JSON.stringify(res["3"]["date"]) + "</td>").split('"').join(" ") + _this.ENTRYEND +
            _this.ENTRYSTART + ("<td>4</td>" + "<td>" + JSON.stringify(res["4"]["name"]) + "</td>" + "<td>" + JSON.stringify(res["4"]["score"]) + "</td>" + "<td>" + JSON.stringify(res["4"]["date"]) + "</td>").split('"').join(" ") + _this.ENTRYEND +
            _this.ENTRYSTART + ("<td>5</td>" + "<td>" + JSON.stringify(res["5"]["name"]) + "</td>" + "<td>" + JSON.stringify(res["5"]["score"]) + "</td>" + "<td>" + JSON.stringify(res["5"]["date"]) + "</td>").split('"').join(" ") + _this.ENTRYEND +
            _this.ENTRYSTART + ("<td>6</td>" + "<td>" + JSON.stringify(res["6"]["name"]) + "</td>" + "<td>" + JSON.stringify(res["6"]["score"]) + "</td>" + "<td>" + JSON.stringify(res["6"]["date"]) + "</td>").split('"').join(" ") + _this.ENTRYEND +
            _this.ENTRYSTART + ("<td>7</td>" + "<td>" + JSON.stringify(res["7"]["name"]) + "</td>" + "<td>" + JSON.stringify(res["7"]["score"]) + "</td>" + "<td>" + JSON.stringify(res["7"]["date"]) + "</td>").split('"').join(" ") + _this.ENTRYEND +
            _this.ENTRYSTART + ("<td>8</td>" + "<td>" + JSON.stringify(res["8"]["name"]) + "</td>" + "<td>" + JSON.stringify(res["8"]["score"]) + "</td>" + "<td>" + JSON.stringify(res["8"]["date"]) + "</td>").split('"').join(" ") + _this.ENTRYEND +
            _this.ENTRYSTART + ("<td>9</td>" + "<td>" + JSON.stringify(res["9"]["name"]) + "</td>" + "<td>" + JSON.stringify(res["9"]["score"]) + "</td>" + "<td>" + JSON.stringify(res["9"]["date"]) + "</td>").split('"').join(" ") + _this.ENTRYEND +
            _this.ENTRYSTART + ("<td>10</td>" + "<td>" + JSON.stringify(res["10"]["name"]) + "</td>" + "<td>" + JSON.stringify(res["10"]["score"]) + "</td>" + "<td>" + JSON.stringify(res["10"]["date"]) + "</td>").split('"').join(" ") + _this.ENTRYEND; }, function (err) { return document.getElementById("leaderboard").innerHTML = "An error has occured, leaderboard is not available."; }, function () { return console.log('Completed'); });
    };
    HighscoreComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/html/highscore.component.html',
            providers: [http_1.HTTP_PROVIDERS, http_service_1.HTTPService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HTTPService])
    ], HighscoreComponent);
    return HighscoreComponent;
}());
exports.HighscoreComponent = HighscoreComponent;
//# sourceMappingURL=highscore.component.js.map