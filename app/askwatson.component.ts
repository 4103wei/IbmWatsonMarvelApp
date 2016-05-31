import { Component, OnInit  } from '@angular/core';


@Component({
  selector: 'home',
  templateUrl: 'app/html/askwatson.component.html'
})
export class AskWatsonComponent {
    question = '';
    view_question = '';
    view_answer = '';
    
    eventHandler(key) {
        if (key==13){
            this.view_question = this.question;
            this.view_answer = this.reqAns(this.question);
            this.question = '';
        }
    } 
    
    reqAns(question){
        // TODO: watson does something with the question
        // this.view_answer = ...
        
        if (question == ''){ 
            return ''
        } else{
            return "this.view_answer"
        }
    }
}

