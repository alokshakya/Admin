import { Component, OnInit } from '@angular/core';
import { DataService} from '../../services/data.service';
import { Test } from '../../shared/test';
@Component({
  selector: 'app-mcqtest',
  templateUrl: './mcqtest.component.html',
  styleUrls: ['./mcqtest.component.scss']
})
export class McqtestComponent implements OnInit {
  test: Test;
  tests: Test[];
  errMess:string;
  submitting:boolean=false;
  category:string;
  categories:string[];
  creatingtestErrMess:string='ye';
  noOfQuestions:number;
  time:number;
  title:string;
  constructor(
    private data: DataService) {

      this.data.fetchTests()
      .subscribe(res => { 
        //do extra actions on received data
        this.tests=res;
        console.log(res);
       },
        errmess => {this.errMess = <any>errmess; });
     }
  

  ngOnInit() {
    this.categories=["Aptitude","English","Reasoning","C Programming","Mixed"];
    this.category=this.categories[0];
  }
  createTest(){
    alert('create test pressed');
    this.data.createTest(this.category,this.noOfQuestions,this.time,this.title)
      .subscribe(res => { 
        //do extra actions on received data
        this.tests=res;
        console.log(res);
       },
        errmess => {this.errMess = <any>errmess; }
      );
    
  }

}
