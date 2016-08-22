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
var home_component_1 = require('./home.component');
var askwatson_component_1 = require('./askwatson.component');
var addquestions_component_1 = require('./addquestions.component');
var highscore_component_1 = require('./highscore.component');
var whoami_component_1 = require('./whoami.component');
var login_component_1 = require('./login.component');
var signup_component_1 = require('./signup.component');
var router_deprecated_1 = require('@angular/router-deprecated');
var AppComponent = (function () {
    function AppComponent() {
        this.title = "Marvel QA";
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n            \n            <nav>\n            <a [routerLink]=\"['Home']\">Home</a>\n            <a [routerLink]=\"['Ask_watson']\">Ask Watson</a>\n            <a [routerLink]=\"['Add_questions']\">Add Questions</a>\n            <a [routerLink]=\"['Highscore']\">Highscore</a>\n            <a [routerLink]=\"['Who_am_i']\">Marvel Quiz</a>\n            <a [routerLink]=\"['Login']\">Log In</a>\n            </nav>\n            <router-outlet></router-outlet>\n            ",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [router_deprecated_1.ROUTER_PROVIDERS]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/home',
                name: 'Home',
                component: home_component_1.HomeComponent,
                useAsDefault: true
            },
            {
                path: '/ask_watson',
                name: 'Ask_watson',
                component: askwatson_component_1.AskWatsonComponent
            },
            {
                path: '/add_questions',
                name: 'Add_questions',
                component: addquestions_component_1.AddQuestionsComponent
            },
            {
                path: '/highscore',
                name: 'Highscore',
                component: highscore_component_1.HighscoreComponent
            },
            {
                path: '/who_am_i',
                name: 'Who_am_i',
                component: whoami_component_1.WhoAmIComponent
            },
            {
                path: '/login',
                name: 'Login',
                component: login_component_1.LoginComponent
            },
            {
                path: '/signup',
                name: 'Signup',
                component: signup_component_1.SignupComponent
            }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map