import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { CodingQuestion } from '../../shared/codingQuestion';
import { McqQuestion } from '../../shared/mcqQuestion';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  codingQuestions:CodingQuestion[];
  mcqQuestions:McqQuestion[];
  errMess:string;
  mcqErrMess:string;
  constructor(private auth: AuthService,
              private data: DataService) {
                this.data.fetchCodingQuestions()
                .subscribe(res => { 
                  //do extra actions on received data
                  this.codingQuestions=res;
                  console.log(res);
                 },
                  errmess => {this.errMess = <any>errmess; });
                  this.data.fetchMcqQuestions()
                .subscribe(res => { 
                  //do extra actions on received data
                  this.mcqQuestions=res;
                  console.log(res);
                 },
                  errmess => {this.mcqErrMess = <any>errmess; });
    
  }

  ngOnInit() {
  }

}
