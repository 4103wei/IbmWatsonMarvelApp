import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {md5} from './md5';


@Injectable()
export class AuthService {

    constructor(private _http:Http) {
        
    }
    
    loginfn(user, pw) {
        var creds = 'name=' + user + '&password=' + pw;
        var headers = new Headers();
        headers.append('Authentication', creds);
        var options = new RequestOptions({ headers: headers });
        this.http.get(this.url + '/Marvel-QA-be/watsonqa/sql/addingScore', options).map(res).subscribe(
            res => {
            
            
            },
            err => this.status = 'Could not initialize the questions.',
            () => console.log('Completed')
        ); ;
        
        
        
        
        window.localStorage.setItem('Authentication', md5(creds));

    }
}