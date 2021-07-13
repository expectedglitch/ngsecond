import { wrongAuth } from './../services/http-errors';
import { HttpRequestsService } from './../services/http-requests.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authFailed: boolean = false;

  constructor(private service: HttpRequestsService, public router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  login(f_value:any){    
    this.service.login(f_value)      
      .subscribe(
        () => {
          //let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          //this.router.navigate([returnUrl || '/'])

          this.route.queryParamMap
          .subscribe(resp => this.router.navigate([resp.get('returnUrl') || '/']));          
        },
        error => {
          if (error instanceof wrongAuth) {
            console.log("User name or Password is incorrect!");
            this.authFailed = true;
          }
          else throw error;
        }
      )
      
        
        // else this.authFailed=true;        
      
  }

}
