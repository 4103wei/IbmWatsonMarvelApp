import { Component, OnInit  } from '@angular/core';
import {AUTH} from './loginfodata';

@Component({
  selector: 'logout',
  templateUrl: 'app/html/logout-page.html'
})
export class LogoutComponent {
    ngOnInit(){
        if (localStorage.getItem('user') != AUTH["user_auth"] || localStorage.getItem('pw') !=  AUTH["pw_auth"]){
            window.location.assign('/login');
        }
    }
    
    
    
    logout(){
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('pw');
        window.location.href='/login';
        console.log("logged out");
    }
}
