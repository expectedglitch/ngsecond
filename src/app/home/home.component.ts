import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestsService } from './../services/http-requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service: HttpRequestsService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }

  loginPageCheck() {
    console.log(this.router.url)
    // this.route.paramMap
    //   .subscribe(params => console.log(params))
  }
}
