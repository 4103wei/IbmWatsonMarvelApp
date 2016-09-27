import {Component, enableProdMode, Injectable, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, URLSearchParams,RequestOptions, Request, RequestMethod, Response} from '@angular/http';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class HTTPService{
    
    private url ='http://localhost:8080';
    
    
    constructor (private http: Http) {}
    
    /* http GET to request the answer to a specific question from the back-end
     */
    ask_watson(question){ 
        var headers = new Headers({"Question" : question}); 
        var options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + '/Marvel-QA-be/watsonqa/submit/getAnswer', options)   
    }
    
    
    /* http GET to requesti JSONs that are required for the game
     */
    get_question_watson(){
        return this.http.get(this.url + '/Marvel-QA-be/watsonqa/sql/watsonquizresponse')
    }
    
    
    /* http POST to request adding a question to the db
     */
    add_question_to_db(question){ 
        var params = question;
        var headers = new Headers(); 
        return this.http.post(this.url + '/Marvel-QA-be/watsonqa/sql/addingQuestions',params,{headers: headers})
        .map(res => res.json()) 
    }
    
    /* http GET to request the highscore leaderboard
     */
    get_highscore_list(){
        return this.http.get(this.url + '/Marvel-QA-be/watsonqa/sql/highscore')
    }
    
    
    /* http GET to request adding a highscore to the leaderboard
     */
    add_highscore(name, score){
        var headers = new Headers();
        headers.append('Name', name);
        headers.append('Score', score);
        var options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + '/Marvel-QA-be/watsonqa/sql/addingScore', options) ;
    }
    
    
    /* http GET to request possible answers to a question
     */
    get_possible_answers(question){
        var headers = new Headers();
        headers.append('Question', question);
        var options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + '/Marvel-QA-be/watsonqa/submit/testPipeline', options) ;
    }
}