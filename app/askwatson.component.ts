import {Component, enableProdMode, Injectable, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, URLSearchParams,RequestOptions, Request, RequestMethod, Response} from '@angular/http';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/mergeMap';
import { HTTPService } from './http.service';





@Component({
    selector: 'home',
    templateUrl: 'app/html/askwatson.component.html',
    providers: [HTTP_PROVIDERS, HTTPService]
})


export class AskWatsonComponent {
    private question = '';
    private view_question = '...';
    private view_answer = 'Ask me something.';
    
    
    constructor(private httpService: HTTPService){}

    /* Triggers when ENTER is pressed
     */
    eventHandler(key) {
        if (key==13){
            this.view_question = this.question;
            this.reqAns(this.question);
            this.question = '';
        }
    } 
    
    /* Requesting an answer from watson
     * Improvement: If Watson doesn't have an answer, then return "I don't know what you mean." 
     */
    reqAns(question){
        if (question == ''){
            this.view_question = '...';
            this.view_answer = 'Ask me something.';
        }else{
            this.view_answer = '(thinking...)';
            this.httpService.ask_watson(question).map(res => res.json()).subscribe(
                res => this.view_answer = JSON.stringify(res.question.evidencelist[0].text),
                err => this.view_answer = "error:" + JSON.stringify(err),
                () => console.log('Completed')
            );
        }
    }
    
}

