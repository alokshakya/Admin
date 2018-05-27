import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { MarkdownService } from '../../services/markdown.service';
import { DataService } from '../../services/data.service';
import * as extras from 'marked-extras';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mcq',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss']
})
export class McqComponent implements OnInit {
  testId:number;
  title:string='';
  optionA:string='';
  optionB:string='';
  optionC:string='';
  optionD:string='';
  answer:string='';
  submitting:boolean=false;
  Response:any;
  errMess:string;
  titleErr:boolean=false;
  markdownContentErr:boolean=false;
  sampleInputErr:boolean=false;
  sampleOutputErr:boolean=false;
  submitInputErr:boolean=false;
  submitOutputErr:boolean=false;
  submittedQuestionSuccess:boolean;
  mcqform:boolean;
  public markdownContent: string = `
  # Headers
  
  # H1
  ## H2
  ### H3
  
  > Paragraph
  
  `;
    constructor(private _markdown: MarkdownService,
                private data: DataService,
                private route: ActivatedRoute,
                private location: Location) {
                  this.testId = +this.route.snapshot.params['id'];
                 }
  
    ngOnInit() {
      extras.init();
      this._markdown.setMarkedOptions({});
      console.log(extras.markedDefaults);
      this._markdown.setMarkedOptions(Object.assign(extras.markedDefaults, {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      }));
      this._markdown.renderer.table = (header: string, body: string) => {
        return `
        <table class="table2">
          <thead>
            ${header}
          </thead>
          <tbody>
            ${body}
          </tbody>
        </table>
        `;
      }
      this._markdown.renderer.blockquote = (quote: string) => {
        return `<blockquote class="king-quote">${quote}</blockquote>`;
      }
      this.submittedQuestionSuccess=false;
      this.mcqform=true;
    }
    submitQuestion(){
      if(this.validate()){
        this.submitting=true;
        this.titleErr=this.markdownContentErr=this.sampleInputErr=this.sampleOutputErr=false;
        this.submitInputErr=this.submitOutputErr=false;
        this.data.addMcqQuestion(this.answer,this.markdownContent,this.optionA,
          this.optionB,this.optionC,this.optionD,this.testId)
          .subscribe(res => {  this.submitting=false; 
          //do extra actions on received data
          this.Response=res;

          this.submittedQuestionSuccess=true;
          this.mcqform=false;
          console.log(res);
          },
          errmess => {this.errMess = <any>errmess; this.submitting=false;});
      }
      else{
          alert('Enter all fields');
      }

    }
    validate():boolean{
      if(this.answer===''){
        this.titleErr=true;
        
      }
      if(this.markdownContent===''){
        this.markdownContentErr=true;
        
      }
      if(this.optionA===''){
        this.sampleInputErr=true;
        
      }
      if(this.optionB===''){
        this.sampleOutputErr=true;
        
      }
      if(this.optionC===''){
        this.submitInputErr=true;
        
      }
      if(this.optionD===''){
        this.submitOutputErr=true;
        
      }
      if(this.answer==='' || this.markdownContent==='' || 
      this.optionA==='' || this.optionB==='' ||
      this.optionC==='' || this.optionD===''){
        return false;
      }
      return true;
    }

    submitMore(){
      this.mcqform=true;
      this.submittedQuestionSuccess=false;
    }
    goBack(): void {
      this.location.back();
    }
    
}
