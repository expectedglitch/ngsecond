import { switchMap } from 'rxjs/operators';
import { HttpRequestsService } from './../services/http-requests.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  image: any;
  title: any;  

  constructor(private route: ActivatedRoute, private service: HttpRequestsService) { }


  ngOnInit(): void {
    this.route.paramMap
      .pipe (
        switchMap(
          params => {
            let id = params.get('product')!;            
            return this.service.getProduct(id);    
          }
        )
      )
      .subscribe(response => {
        this.title = response.title;
        this.image = response.image;
      })

      // .subscribe(resp => {
      //     let id = resp.get('product')!;
      //     this.service.getProduct(id)
      //       .subscribe (response => {
      //         this.title = response.title;
      //         this.image = response.image;
      //       })
      //   }
      // )
  }

}
