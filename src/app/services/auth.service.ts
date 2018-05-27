import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http'; //for post request with data

import { HttpHeaders } from '@angular/common/http';
import { ProcessHttpMsgService } from './process-http-msg.service';
import { LoginResponse } from '../shared/loginResponse';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
  url:string;
  constructor(private http: Http,
    private processHttpMsgService: ProcessHttpMsgService) {
      this.url=`https://auth.enlightenment56.hasura-app.io`;
     }

  Login(username:string, password:string):Observable<LoginResponse>{

        let hadata=JSON.stringify(
          {
            "provider" : "username",
            "data" : {
               "username": username,
               "password": password
            }
          }
        );

      let Hsheaders = new Headers();
      Hsheaders.append('Content-Type', 'application/json');  
      let Hsopts = new RequestOptions();
      Hsopts.headers = Hsheaders;
      return this.http.post('https://auth.enlightenment56.hasura-app.io/v1/login',hadata,Hsopts)
            .map(res =>{console.log(res);  return this.processHttpMsgService.extractData(res);
            })
            .catch(error => { return this.processHttpMsgService.handleError(error);}); 
   
      }
  Logout(): Observable<any>{
      console.log('logout presses in auth service');
      var user=JSON.parse(localStorage.getItem('user'));
      console.log(user);
      let hadata=JSON.stringify(
        {
        
        }
      );
      let Hsheaders = new Headers();
      console.log('Authorization','Bearer '+user.auth_token);
      Hsheaders.append('Content-Type', 'application/json');
      Hsheaders.append('Authorization', 'Bearer '+user.auth_token); 
      let Hsopts = new RequestOptions();
      Hsopts.headers = Hsheaders;
      return this.http.post('https://auth.enlightenment56.hasura-app.io/v1/user/logout',hadata,Hsopts)
            .map(res =>{console.log(res); return this.processHttpMsgService.extractData(res);
              
            })
            .catch(error => {console.log('failed'); return this.processHttpMsgService.handleError(error);
            
            }); 
   
      }
  isLoggedIn():boolean{
    if(JSON.parse(localStorage.getItem('user'))!=null){
      return true;
    } 
    else{
      return false;
    }
    
  }

  isContentManager():boolean{
    if(localStorage.getItem('user')!=null){
      var user=JSON.parse(localStorage.getItem('user'));
      //console.log(user);
      for(let i=0; i<user.hasura_roles.length;i++)
      {
        //console.log('roles for user '+i+' '+user.hasura_roles[i]);
        if(user.hasura_roles[i]==='contentManager')
        {
          return true;
        }
      }
      return false;
    } 
    else{
      return false;
    }
    
  }
  getUsername():string{
      return JSON.parse(localStorage.getItem('user')).username;
  }
}
