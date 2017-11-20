
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
    
    private selected = [];
    
    
    
    constructor(private httpService: HTTPService){}
    
    
    ngOnInit(){
        if (localStorage.getItem('user') != AUTH["user_auth"] || localStorage.getItem('pw') !=  AUTH["pw_auth"]){
            window.location.assign('/login');
        }
    }
    
    // receiving key event
    eventHandler(key) {
        if (key==13 && this.addquestionbox != ''){
            
            document.getElementById("addquestioncontent").innerHTML = "<center><div id ='delay'>Loading...</div></center>";
            this.httpService.get_possible_answers(this.addquestionbox).map(res => res.json()).subscribe(
                res => {
                    //console.log(res);
                    this.specifyPage(res);
                },
                err => console.log("Question could not be submitted."),
                () => console.log('Completed')
            );
        }
    } 

    
    
    specifyPage(jsonobj){

        // setting up template to be submitted
        document.getElementById("addquestioncontent").innerHTML =  "<h3>Add Questions</h3><div class='question'>" + this.addquestionbox + "</div><div id='o0'>undefined</div><div class='addwrong' id='o1'>undefined</div><div class='addwrong' id='o2'>undefined</div><div class='addwrong' id='o3'>undefined</div><br>";
        
        
        document.getElementById("addquestioncontent").innerHTML = 
        document.getElementById("addquestioncontent").innerHTML +
            "<div class='addmenucontrol'>" +
            "<button class='button' id='cancelbutton'>Cancel</button> " +    // cancel button
            "<button class='button' id='clearbutton'>Clear</button> " +      //  clear button
            "<button class='button' id='addbutton'>Add Question</button>" + // add button
            "</div><hr>";  
        
        
        if (jsonobj["length"] == 0){
            document.getElementById("addquestioncontent").innerHTML = 
            document.getElementById("addquestioncontent").innerHTML +
            "No entities could be extracted from your question, please try another question or consider rewording your question. Press 'Cancel' to return.";
        }
        
        
        // go through every sentenceAnswers
        for(let i = 0; i < jsonobj["length"]; i++){
            // extracting each obj info
            let confidence = jsonobj["sentenceAnswers"][i]["confidence"];
            let namedEntities = jsonobj["sentenceAnswers"][i]["namedEntities"]; // Array
            let sentence = jsonobj["sentenceAnswers"][i]["sentence"];
            
            // display sentence
            document.getElementById("addquestioncontent").innerHTML = 
            document.getElementById("addquestioncontent").innerHTML + "<div class='sentence'>" + sentence + "</div>";
            
            // display confidence
            document.getElementById("addquestioncontent").innerHTML = 
            document.getElementById("addquestioncontent").innerHTML + "<div class='confidence'>Confidence: " + confidence + "</div>";            
            
            // display every named entity for this sentence
            for(let k= 0; k < namedEntities["length"] ; k++){
                document.getElementById("addquestioncontent").innerHTML = 
                document.getElementById("addquestioncontent").innerHTML +
                "<button class='button selectable' id='selectable" + i.toString() + "_" + k.toString() + "'>" + namedEntities[k] + "</button> "
            }
            
            

            
        }
        

        
        
        
        
        // adding onclicks
        for(let i = 0; i < jsonobj["length"]; i++){
            let namedEntities = jsonobj["sentenceAnswers"][i]["namedEntities"]; // Array
            for(let k= 0; k < namedEntities["length"] ; k++){
                let id = "selectable" + i.toString() + "_" + k.toString();
                document.getElementById(id).onclick = ()=>{
                    //check whether or not the clicked button is already in the chosen answers
                    let contain = false;
                    for (let t = 0; t < this.selected.length; t++){

                        if (document.getElementById(this.selected[t]).innerHTML == document.getElementById(id).innerHTML) contain = true;
                    }
                    if(this.selected.length < 4 && !contain) this.selected.push(id);    // saving the answer

                    for (let b = 0; b < this.selected.length; b++){
                        let id = "o" + b.toString();
                        document.getElementById(id).innerHTML = document.getElementById(this.selected[b]).innerHTML;
                    }

                    
                };
            }
        }
            
        
        // cancel button onclick
        document.getElementById("cancelbutton").onclick = ()=>{location.reload();};
        
        // clear button onclick
        document.getElementById("clearbutton").onclick = ()=>{
            this.selected = [];
            //reset view
            document.getElementById("o0").innerHTML = "undefined";
            document.getElementById("o1").innerHTML = "undefined";
            document.getElementById("o2").innerHTML = "undefined";
            document.getElementById("o3").innerHTML = "undefined";
        };
        
        // add button onclick
        document.getElementById("addbutton").onclick = ()=>{
            //{"question":"who is spider-man?","correct":"Peter Parker","wrong_1":"Spider-Man","wrong_2":"Tony Stark","wrong_3":"Iron Man"}
            
            if (this.selected.length == 4){
                let jsonstringresult = '{"question":"'+ this.addquestionbox +'","correct":"' + document.getElementById(this.selected[0]).innerHTML +'","wrong_1":"'+ document.getElementById(this.selected[1]).innerHTML +'","wrong_2":"'+  document.getElementById(this.selected[2]).innerHTML +'","wrong_3":"'+ document.getElementById(this.selected[3]).innerHTML +'"}';
                
                this.httpService.add_question_to_db(jsonstringresult).map(res => res.json()).subscribe(
                    res => console.log(jsonstringresult + " added"),
                    err => console.log(jsonstringresult + " added"),
                    () => console.log('Completed')
                 );
                location.reload();
            }
        };
        
    }
    
    
    
    
}

