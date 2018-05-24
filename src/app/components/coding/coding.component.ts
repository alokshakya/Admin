import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { MarkdownService } from '../../services/markdown.service';
import * as extras from 'marked-extras';
@Component({
  selector: 'app-coding',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.scss']
})
export class CodingComponent implements OnInit {
  public markdownContent: string = `
  # Headers
  
  # H1
  ## H2
  ### H3
  #### H4
  ##### H5
  ###### H6
  
  Alternatively, for H1 and H2, an underline-ish style:
  
  Alt-H1
  ======
  
  Alt-H2
  ------
  
  
  
  # Emphasis
  
  Emphasis, aka italics, with *asterisks* or _underscores_.
  
  Strong emphasis, aka bold, with **asterisks** or __underscores__.
  
  Combined emphasis with **asterisks and _underscores_**.
  
  # Tables
  
  Colons can be used to align columns.
  
  | Tables        | Are           | Cool  |
  | ------------- |:-------------:| -----:|
  | col 3 is      | right-aligned | $1600 |
  | col 2 is      | centered      |   $12 |
  | zebra stripes | are neat      |    $1 |
  
  There must be at least 3 dashes separating each header cell.
  The outer pipes (|) are optional, and you don't need to make the
  raw Markdown line up prettily. You can also use inline Markdown.
  
  
  
  `;
    constructor(private _markdown: MarkdownService) { }
  
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
    }
    
}
