import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http'; //for post request with data

import { HttpHeaders } from '@angular/common/http';
import { ProcessHttpMsgService } from './process-http-msg.service';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class DataService {
  url:string;
  constructor(private http: Http,
    private processHttpMsgService: ProcessHttpMsgService) {
      this.url=`https://data.enlightenment56.hasura-app.io/v1/query`;
     }
  
     addCodingQuestion(title:string, description:string,
                        sampleInput:string,sampleOutput:string,
                        submitInput:string,submitOutput:string):Observable<any>{
      var user=JSON.parse(localStorage.getItem('user'));
      let hadata=JSON.stringify(
        {
          "type" : "insert",
          "args" : {
             "table":"CodingQuestions",
             "objects":[
               {
                 "title":title,
                 "description":description,
                 "sampleInput":sampleInput,
                 "sampleOutput":sampleOutput,
                 "submitInput":submitInput,
                 "submitOutput":submitOutput,
                 "author":user.hasura_id
               }
             ]
          }
        }
      );
      let dataQ=JSON.stringify(
        {
          "type": "insert",
          "args": {
              "table": "CodingQuestions",
              "objects": [
                  {
                      "title": title,
                      "description": description,
                      "sampleInput": sampleInput,
                      "sampleOutput": sampleOutput,
                      "submitInput": submitInput,
                      "submitOutput": submitOutput,
                      "author": user.hasura_id
                  }
              ],
              "returning":["id"]
          }
      }
      );

    let Hsheaders = new Headers();
    Hsheaders.append('Content-Type', 'application/json');
    Hsheaders.append('Authorization', 'Bearer '+user.auth_token); 
    Hsheaders.append('X-Hasura-Role', 'contentManager');  
    let Hsopts = new RequestOptions();
    Hsopts.headers = Hsheaders;
    return this.http.post(this.url,hadata,Hsopts)
          .map(res =>{console.log(res);  return this.processHttpMsgService.extractData(res);
          })
          .catch(error => { return this.processHttpMsgService.handleError(error);}); 
 
    }

}
