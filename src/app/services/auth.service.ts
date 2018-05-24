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
      isLoggedIn():boolean{
        if(localStorage.getItem('user')!=null){
          return true;
        } 
        else{
          return false;
        }
        
      }
}
