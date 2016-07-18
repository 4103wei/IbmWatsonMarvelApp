import { Component, OnInit  } from '@angular/core';


@Component({
  selector: 'home',
  templateUrl: 'app/html/whoami.component.html'
})
export class WhoAmIComponent {

    startTimer() {
        
        document.getElementById("gamewindow").innerHTML = "<center><div id ='delay'>GET READY...</div></center>";
        setTimeout(this.initQuestions(), 500);
    }

    initQuestions() {
        //TODO: Generate Question
        //TODO: Fetch 4 answers from Watson
        var question = '';  
        var answers = ['', '', '', '']; 
        var question_count = 0;
        var maximum_question_count = 15;
        var answers_given = [];
        
        
        
        var next = function(ans){
                        question_count = question_count + 1;
                        if (question_count > maximum_question_count){
                            document.getElementById("gamewindow").innerHTML = 
                                "Your answers: " + answers_given + "<br>Some stats<br>\
                                <button class='button' id='pa'>Play Again (TODO)</button>";
                            
                            document.getElementById("pa").onclick= function(){alert("To be implemented")};
                        }else{
                            if(ans != -1){
                                // TODO ------- save answer
                                answers_given.push(ans);
                            }





                            // TODO ------- fetch question + answers
                            answers = ['Peter Parker', 'Natalia Alianovna', 'Anthony Edward Stark', 'Wanda Maximoff']; 
                            question = 'What is the real name of Black Widow?';  
                            if (question_count % 2 == 0){
                            answers = ['45', '27', '38', '22']; 
                            question = 'How old is Hawkeye?';  
                            }
                            //------------------

                            document.getElementById("question_num").innerHTML = question_count.toString() + " of " + maximum_question_count.toString();
                            document.getElementById("question").innerHTML = question;
                            document.getElementById("ans1").innerHTML = answers[0];
                            document.getElementById("ans2").innerHTML = answers[1];
                            document.getElementById("ans3").innerHTML = answers[2];
                            document.getElementById("ans4").innerHTML = answers[3];

                        }
                    }   
        
        document.getElementById("gamewindow").innerHTML = "<center><div id=question_num></div><br><div id=question></div><br>\
        <button class='button' id='ans1'></button>\
        <button class='button' id='ans2'></button>\
        <button class='button' id='ans3'></button>\
        <button class='button' id='ans4'></button></center>";
        
        document.getElementById("ans1").onclick= function(){next(1)};
        document.getElementById("ans2").onclick= function(){next(2)};
        document.getElementById("ans3").onclick= function(){next(3)};
        document.getElementById("ans4").onclick= function(){next(4)};
        
        next(-1);
    }

}

