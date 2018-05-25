import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  errMess:string;
  submitting:boolean;
  constructor(private auth: AuthService, private router: Router) {this.submitting=false; }

  ngOnInit() {
    
  }
  Logout(){
    this.submitting=true;
    this.auth.Logout()
    .subscribe(loginres => {  this.submitting=false; 
      //do extra actions on received data
      localStorage.removeItem('user');
      //this.router.navigateByUrl('/coding');
      //after successfull login navigate to dashboard
      console.log(loginres);
      alert(loginres.message);
      this.router.navigateByUrl('/login');
     },
      errmess => {this.errMess = <any>errmess; this.submitting=false;});
  }

}
