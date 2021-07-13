import { HttpRequestsService } from './../services/http-requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  orders: any;

  constructor(private service: HttpRequestsService) { }

  ngOnInit(): void {    
    this.service.getOrders
      .subscribe(resp => this.orders = resp)
  }

}
