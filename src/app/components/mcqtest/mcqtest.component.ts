import { Component, OnInit } from '@angular/core';
import { DataService} from '../../services/data.service';
import { Test } from '../../shared/test';
import { Router } from '@angular/router';
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
  creatingtestErrMess:string;
  creatingTest:boolean;
  noOfQuestions:number;
  time:number;
  title:string;
  createTestshow:boolean;
  returningId:number;
  constructor(
    private data: DataService,
    private router: Router) {

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
    this.createTestshow=false;
    this.creatingTest=false;
  }
  createTest(){
    alert('create test pressed');
    this.creatingTest=true;
    this.data.createTest(this.category,this.noOfQuestions,this.time,this.title)
      .subscribe(res => { 
        //do extra actions on received data
        this.returningId=res.returning[0].id;
        this.creatingTest=false;
        this.router.navigateByUrl('/mcq/:'+this.returningId);
        console.log(res);
       },
        errmess => {this.creatingtestErrMess = <any>errmess; this.creatingTest=false; }
      );
    
  }

  createTestShow(){
    this.createTestshow=true;
  }
  createTestShowFalse(){
    this.createTestshow=false;
  }

}
