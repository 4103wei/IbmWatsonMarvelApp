import { Component }       from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HomeComponent } from './home.component';
import { AskWatsonComponent } from './askwatson.component';
import { AddQuestionsComponent } from './addquestions.component';
import { HighscoreComponent } from './highscore.component';
import { WhoAmIComponent } from './whoami.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';



@Component({
      selector: 'my-app',
      template: `
            <nav>
            <a [routerLink]="['Home']">Home</a>
            <a [routerLink]="['Ask_watson']">Ask Watson</a>
            <a [routerLink]="['Add_questions']">Add Questions</a>
            <a [routerLink]="['Highscore']">Highscore</a>
            <a [routerLink]="['Who_am_i']">Marvel Quiz</a>
            </nav>
            <router-outlet></router-outlet>
            `,
      directives: [ROUTER_DIRECTIVES],
      providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
        {path: '/home',name: 'Home',component: HomeComponent,useAsDefault: true},
        {path: '/ask_watson',name: 'Ask_watson',component: AskWatsonComponent},
        {path: '/add_questions',name: 'Add_questions',component: AddQuestionsComponent},
        {path: '/highscore',name: 'Highscore',component: HighscoreComponent},
        {path: '/quiz',name: 'Who_am_i',component: WhoAmIComponent},
        {path: '/login',name: 'Login',component: LoginComponent},
        {path: '/logout',name: 'Logout',component: LogoutComponent}
])

export class AppComponent {
    

    
    
    title = "Marvel QA";
}



