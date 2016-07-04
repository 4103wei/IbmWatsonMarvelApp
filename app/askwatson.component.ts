//import { Component, OnInit  } from '@angular/core';
//import {HTTPService} from './http.service';


import {Component, enableProdMode, Injectable, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, URLSearchParams,RequestOptions, Request, RequestMethod, Response} from '@angular/http';
import "rxjs/add/operator/map";
@Injectable()
class HTTPService{
    
    constructor (private http: Http) {}
    
    postJSON(){
        /*
        var json = JSON.stringify({"question":{"questionText" : "Who is Nick fury?"}});
        var params = 'json=' + json;
        var headers = new Headers();   
        headers.append('X-SyncTimeout','30');
        headers.append('Accept','application/json');
        headers.append('Cache-Control','no-cache');
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Basic dHVkX21hbmFnZXIxOldtc1dpZW1j');
        
        headers.append('Authorization', 'Basic ' + btoa('tud_manager1:WmsWiemc'));
        return this.http.post('https://watson-wdc01.ihost.com/instance/518/deepqa/v1/question',params,{headers: headers}).map(res => res.json())*/
    }
    

    
    postJSON_tutorial(){
        // test method for post request
        // works perfectly fine
        var json = JSON.stringify({var1: 'test', var2: 3, var3: "asdas"});
        var params = 'json=' + json;
        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        return this.http.post('http://validate.jsontest.com',params,{headers: headers})
    }
    postJSON_tutorial2(){
        var json = JSON.stringify({var1: 'test', var2: 3, var3: "asdas"});
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('http://validate.jsontest.com',json,{headers: headers})
    }
    
    getJSON_tutorial(){
        // test method for get request
        // works perfectly fine
        return this.http.get('http://jsonplaceholder.typicode.com/posts/1')
    }
    
    
    test(question){ 
        var params = question;

        var headers = new Headers(); 
        headers.append('Filepath', 'C:/Users/shameless/Desktop/angular2-tour-of-heroes/response.json');
        
        
        this.http.post('http://localhost:8080/Marvel-QA-be/watsonqa/submit/postQuestion',params,{headers: headers})
        .map(res => res.json()).subscribe();
        
        return this.http.get('./response.json')
      
    }
    
    readResponse(){
        return this.http.get('./response.json')
    }
        
     
    
}





@Component({
    selector: 'home',
    templateUrl: 'app/html/askwatson.component.html',
    providers: [HTTP_PROVIDERS, HTTPService]
})


export class AskWatsonComponent {
    question = '';
    view_question = '';
    view_answer = '';
    
    
    constructor(private httpService: HTTPService){}

    
    eventHandler(key) {
        if (key==13){
            this.view_question = this.question;
            //this.view_answer = this.reqAns(this.question);
            this.reqAns(this.question);
            this.question = '';
        }
    } 
    
    reqAns(question){
        if (question == ''){ 
            return ''
        }else{
            this.httpService.test(question).map(res => res.json()).subscribe(
                res => this.view_answer = JSON.stringify(res.question.evidencelist[0].text),
                err => this.view_answer = "error:" + JSON.stringify(err),
                () => console.log('Completed')
            );


        }
    }
    
}

