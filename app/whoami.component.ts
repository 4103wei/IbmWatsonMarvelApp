import {Component, enableProdMode, Injectable, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, URLSearchParams,RequestOptions, Request, RequestMethod, Response} from '@angular/http';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/mergeMap';
import { HTTPService } from './http.service';
import {Observable} from 'rxjs/Rx';
import {AUTH} from './loginfodata';

@Component({
    selector: 'home',
    templateUrl: 'app/html/whoami.component.html',
    providers: [HTTP_PROVIDERS, HTTPService]
})

export class WhoAmIComponent {
    private status ='';
    private jsonstring = '';
    private jsonarray=null;
    private maxquestioncount = 15;
    private rannum = 0;
    private questions = [];
    private givenanswers = [];
    private correctanswers = [];
    private score = 0;
    private namebox = '';
    constructor(private httpService: HTTPService){}

    
    ngOnInit(){
        if (localStorage.getItem('user') != AUTH["user_auth"] || localStorage.getItem('pw') !=  AUTH["pw_auth"]){
            window.location.assign('/login');
        }
    }
    
    /* Do a http GET request to fetch the question needed for the quiz
     * The result should be in JSON format
     */
    fetchQuestion(){
        this.httpService.get_question_watson().map(res => res.json()).subscribe(
            res => {this.jsonstring = JSON.stringify(res); this.initQuestions();},
            err => this.status = 'Could not initialize the questions.',
            () => console.log('Completed')
        );
    }
    
    
    /* This method uses the httpService to do a GET request to update the leaderboard.
     */
    addScore(name, score){
        this.httpService.add_highscore(name, score).map(res => res.json()).subscribe(
            res => console.log('Completed'),
            err => console.log('Completed')
        );
    }
    
    /* Start a timer, the game starts after the countdown. 
     */
    startTimer(){
        document.getElementById("gamewindow").innerHTML = "<center><div id ='delay'>GET READY...</div></center>";
        this.fetchQuestion();
        //setTimeout(()=>{this.initQuestions();}, 60000);
    }

    /* initialize a question
     * param: int id - id of the question&answer set that have to be initialized 
     */
    qinit(id){

        var audio = new Audio();
        audio.src = "assets/button-3.mp3";
        audio.play();

        
        if (id > this.maxquestioncount){
            // Game ended, evaluation
            
            // score
            var k = 0;
            while(k < this.maxquestioncount){
                if (this.givenanswers[k] == this.correctanswers[k]){
                    this.score = this.score + 100;
                }
                k++;
            }
            var i = 0;
            var evperquestion = '';
            while(i < this.maxquestioncount){
                evperquestion = evperquestion + "<div class ='ev'><div class='evq'>The question is: "+ this.questions[i] + "</div>" + "<div class ='evca'>The correct answer is: "+ this.correctanswers[i] + "</div>" + "<div class ='evga'>Your answer was: "+ this.givenanswers[i] + "</div></div>";
                i++;
            }
            document.getElementById("gamewindow").innerHTML = evperquestion + "<div class='evscore'>Score: "+ this.score + "</div>"+ "<button class='button' id='replay'>Replay</button>";
            document.getElementById("replay").onclick= ()=>{this.startTimer()};
            
            this.addScore(this.namebox, this.score.toString()); // add score to the leaderboard
        }else{
            this.rannum = Math.floor(Math.random() * 4); // {0,1,2,3}
            document.getElementById("gamewindow").innerHTML = "<center><div id=question_num></div><br><div class='question' id=question></div><br>\
            <button class='button answerbutton' id='ans0'></button>\
            <button class='button answerbutton' id='ans1'></button>\
            <button class='button answerbutton' id='ans2'></button>\
            <button class='button answerbutton' id='ans3'></button></center>";
            document.getElementById("ans0").onclick= ()=>{this.givenanswers.push(document.getElementById("ans0").innerHTML);this.qinit(id+1);};
            document.getElementById("ans1").onclick= ()=>{this.givenanswers.push(document.getElementById("ans1").innerHTML);this.qinit(id+1);};
            document.getElementById("ans2").onclick= ()=>{this.givenanswers.push(document.getElementById("ans2").innerHTML);this.qinit(id+1);};
            document.getElementById("ans3").onclick= ()=>{this.givenanswers.push(document.getElementById("ans3").innerHTML);this.qinit(id+1);};
            document.getElementById("question_num").innerHTML = id.toString() + " of " +this.maxquestioncount.toString();
            document.getElementById("question").innerHTML = this.jsonarray[id.toString()]["question"];
            document.getElementById("ans"+this.rannum.toString()).innerHTML = this.jsonarray[id.toString()]["correct"];
            document.getElementById("ans"+((this.rannum + 1) %4).toString()).innerHTML = this.jsonarray[id.toString()]["wrong_1"];
            document.getElementById("ans"+((this.rannum + 2) %4).toString()).innerHTML = this.jsonarray[id.toString()]["wrong_2"];
            document.getElementById("ans"+((this.rannum + 3) %4).toString()).innerHTML = this.jsonarray[id.toString()]["wrong_3"];
        }  
    }

    
    /* Game logic
     */
    initQuestions() {
        // init game data
        this.jsonarray = JSON.parse(this.jsonstring);
        this.score = 0;
        this.givenanswers = [];
        this.correctanswers = [];
        this.questions = [];
        // init true answers and questions from game data
        var i = 1;
        while (i <= this.maxquestioncount){
            this.correctanswers.push(this.jsonarray[i.toString()]["correct"]);
            this.questions.push(this.jsonarray[i.toString()]["question"]);
            i++;
        }
        // init quiz
        this.qinit(1);
    }
    
}

