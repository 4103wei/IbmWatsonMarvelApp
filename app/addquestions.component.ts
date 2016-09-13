
import { HTTPService } from './http.service';
import {Component, enableProdMode, Injectable, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, URLSearchParams,RequestOptions, Request, RequestMethod, Response} from '@angular/http';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/mergeMap';
import {AUTH} from './loginfodata';


@Component({
    selector: 'home',
    templateUrl: 'app/html/addquestions.component.html',
    providers: [HTTP_PROVIDERS, HTTPService]
})
export class AddQuestionsComponent {
    private notification = '';
    private addquestionbox = '';
    
    constructor(private httpService: HTTPService){}
    
    
    ngOnInit(){
        if (localStorage.getItem('user') != AUTH["user_auth"] || localStorage.getItem('pw') !=  AUTH["pw_auth"]){
            window.location.assign('/login');
        }
    }
    
    // receiving key event
    eventHandler(key) {
        if (key==13 && this.addquestionbox != ''){
            this.notification = 'Your question: "'+this.addquestionbox+'" has been submitted.';
            this.httpService.add_question_to_db(this.addquestionbox).map(res => res.json()).subscribe(
                res => this.notification = this.notification,
                err => this.notification = "Question could not be submitted.",
                () => console.log('Completed')
            );
            this.addquestionbox = '';
        }else{
            this.notification = '';
        }
    } 
    
}

