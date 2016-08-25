import {Component, enableProdMode, Injectable, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, URLSearchParams,RequestOptions, Request, RequestMethod, Response} from '@angular/http';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class HTTPService{
    constructor (private http: Http) {}
    
    /*
    postJSON(){
        var json = JSON.stringify({"question":{"questionText" : "Who is Nick fury?"}});
        var params = 'json=' + json;
        var headers = new Headers();   
        headers.append('X-SyncTimeout','30');
        headers.append('Accept','application/json');
        headers.append('Cache-Control','no-cache');
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Basic dHVkX21hbmFnZXIxOldtc1dpZW1j');
        
        headers.append('Authorization', 'Basic ' + btoa('tud_manager1:WmsWiemc'));
        return this.http.post('https://watson-wdc01.ihost.com/instance/518/deepqa/v1/question',params,{headers: headers}).map(res => res.json())
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
    */
    
    
    /* http POST request to get the answer of watson to a specific question
     */
    ask_watson(question){ 
        var params = question;
        var headers = new Headers(); 
        headers.append('Filepath', 'C:/Users/shameless/Desktop/angular2-tour-of-heroes/response.json');
        return this.http.post('http://localhost:8080/Marvel-QA-be/watsonqa/submit/postQuestion',params,{headers: headers})
        .map(res => {})
            .flatMap(() => this.http.get('./response.json'))    
    }
    
    
    /* Requesting Questions that are required for the game
     */
    get_question_watson(){
        return this.http.get('http://localhost:8080/Marvel-QA-be/watsonqa/sql/requestQuestions')
    }
    
    
    /* http POST request to add a question to the db
     */
    add_question_to_db(question){ 
        var params = question;
        var headers = new Headers(); 
        return this.http.post('http://localhost:8080/Marvel-QA-be/watsonqa/sql/addingQuestions',params,{headers: headers})
        .map(res => res.json()) 
    }
    
    get_highscore_list(){
        return this.http.get('http://localhost:8080/Marvel-QA-be/watsonqa/sql/highscore')
    }
    
}