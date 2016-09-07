import {Component, enableProdMode, Injectable, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, URLSearchParams,RequestOptions, Request, RequestMethod, Response} from '@angular/http';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/mergeMap';
import { HTTPService } from './http.service';


@Component({
    selector: 'home',
    templateUrl: 'app/html/highscore.component.html',
    providers: [HTTP_PROVIDERS, HTTPService]
})
export class HighscoreComponent {
    private TABLEHEADER = "<tr><th>Rank</th><th>Name</th><th>Score</th><th>Time</th></tr>";
    private ENTRYSTART = "<tr>";
    private ENTRYEND = "</tr>";
    
    constructor(private httpService: HTTPService){}
    
    
    ngOnInit(){
        this.httpService.get_highscore_list().map(res => res.json()).subscribe(
        res => document.getElementById("leaderboard").innerHTML = this.TABLEHEADER +
            this.ENTRYSTART + ("<td>1</td>" + "<td>"+JSON.stringify(res["1"]["name"])+"</td>" + "<td>"+JSON.stringify(res["1"]["score"])+"</td>" + "<td>"+JSON.stringify(res["1"]["date"])+"</td>").split('"').join(" ") + this.ENTRYEND +
            this.ENTRYSTART + ("<td>2</td>" + "<td>"+JSON.stringify(res["2"]["name"])+"</td>" + "<td>"+JSON.stringify(res["2"]["score"])+"</td>" + "<td>"+JSON.stringify(res["2"]["date"])+"</td>").split('"').join(" ") + this.ENTRYEND +
            this.ENTRYSTART + ("<td>3</td>" + "<td>"+JSON.stringify(res["3"]["name"])+"</td>" + "<td>"+JSON.stringify(res["3"]["score"])+"</td>" + "<td>"+JSON.stringify(res["3"]["date"])+"</td>").split('"').join(" ") + this.ENTRYEND +
            this.ENTRYSTART + ("<td>4</td>" + "<td>"+JSON.stringify(res["4"]["name"])+"</td>" + "<td>"+JSON.stringify(res["4"]["score"])+"</td>" + "<td>"+JSON.stringify(res["4"]["date"])+"</td>").split('"').join(" ") + this.ENTRYEND +
            this.ENTRYSTART + ("<td>5</td>" + "<td>"+JSON.stringify(res["5"]["name"])+"</td>" + "<td>"+JSON.stringify(res["5"]["score"])+"</td>" + "<td>"+JSON.stringify(res["5"]["date"])+"</td>").split('"').join(" ") + this.ENTRYEND +
            this.ENTRYSTART + ("<td>6</td>" + "<td>"+JSON.stringify(res["6"]["name"])+"</td>" + "<td>"+JSON.stringify(res["6"]["score"])+"</td>" + "<td>"+JSON.stringify(res["6"]["date"])+"</td>").split('"').join(" ") + this.ENTRYEND +
            this.ENTRYSTART + ("<td>7</td>" + "<td>"+JSON.stringify(res["7"]["name"])+"</td>" + "<td>"+JSON.stringify(res["7"]["score"])+"</td>" + "<td>"+JSON.stringify(res["7"]["date"])+"</td>").split('"').join(" ") + this.ENTRYEND +
            this.ENTRYSTART + ("<td>8</td>" + "<td>"+JSON.stringify(res["8"]["name"])+"</td>" + "<td>"+JSON.stringify(res["8"]["score"])+"</td>" + "<td>"+JSON.stringify(res["8"]["date"])+"</td>").split('"').join(" ") + this.ENTRYEND +
            this.ENTRYSTART + ("<td>9</td>" + "<td>"+JSON.stringify(res["9"]["name"])+"</td>" + "<td>"+JSON.stringify(res["9"]["score"])+"</td>" + "<td>"+JSON.stringify(res["9"]["date"])+"</td>").split('"').join(" ") + this.ENTRYEND +
            this.ENTRYSTART + ("<td>10</td>" + "<td>"+JSON.stringify(res["10"]["name"])+"</td>" + "<td>"+JSON.stringify(res["10"]["score"])+"</td>" + "<td>"+JSON.stringify(res["10"]["date"])+"</td>").split('"').join(" ") + this.ENTRYEND 
            ,
            err => document.getElementById("leaderboard").innerHTML = "An error has occured, leaderboard is not available.",
            () => console.log('Completed')
        );
        

    }
}

