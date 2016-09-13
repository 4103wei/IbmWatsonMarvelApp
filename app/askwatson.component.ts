import {Component, enableProdMode, Injectable, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, URLSearchParams,RequestOptions, Request, RequestMethod, Response} from '@angular/http';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/mergeMap';
import { HTTPService } from './http.service';
import {Router, ROUTER_PROVIDERS} from '@angular/router'
import {AUTH} from './loginfodata';



@Component({
    selector: 'home',
    templateUrl: 'app/html/askwatson.component.html',
    providers: [HTTP_PROVIDERS, HTTPService, ROUTER_PROVIDERS]
})


export class AskWatsonComponent {
    private question = '';
    private view_question = '...';
    private view_answer = 'Ask me something.';
    
    
    
    private answer = '{"1":{"specific_answer":"spider-man", "paragraph":"spider-mans real name is peter parker. He is 15 years old and...", "confidence": "0.54"},\
                    "2":{"specific_answer":"tony stark", "paragraph":"iron real name is peter parker. He is 45 years old and...", "confidence": "0.34"}\
                    }';
    
    
    constructor(private httpService: HTTPService, private router: Router){}

    ngOnInit(){
        if (localStorage.getItem('user') != AUTH["user_auth"] || localStorage.getItem('pw') !=  AUTH["pw_auth"]){
            window.location.assign('/login');
        }
    }

    
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
            document.getElementById('ask_watson_answer').innerHTML = 'Ask me something.';
        }else{
            document.getElementById('ask_watson_answer').innerHTML = '(thinking...)';
            /*
            this.httpService.ask_watson(question).map(res => res.json()).subscribe(
                res => this.view_answer = JSON.stringify(res.question.evidencelist[0].text),
                err => this.view_answer = "error:" + JSON.stringify(err),
                () => console.log('Completed')
            );*/
            
            var jsonlength = Object.keys(JSON.parse(this.answer)).length;
            document.getElementById('ask_watson_answer').innerHTML = '';
            for (var i = 1; i <= jsonlength; i++ ){
                var specific_answer = "<div class='specific_answer'>Answer: " + JSON.parse(this.answer)[i.toString()]["specific_answer"] + "</div>";
                var paragraph = "<div class='paragraph'>Paragraph: " + JSON.parse(this.answer)[i.toString()]["paragraph"] + "</div>";
                var confidence = "<div class='confidence'>Confidence: " + JSON.parse(this.answer)[i.toString()]["confidence"] + "</div>";
                document.getElementById('ask_watson_answer').innerHTML = document.getElementById('ask_watson_answer').innerHTML + specific_answer + paragraph + confidence + '<br>' ;
            }
            
        }
    }
    
}

