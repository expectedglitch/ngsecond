import { HttpRequestsService } from './../services/http-requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  cards: any;

  constructor(private service: HttpRequestsService) { }

  ngOnInit(): void {
    this.service.getCatalog
      .subscribe(resp => this.cards=resp);
  }

}
