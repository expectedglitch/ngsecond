import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { fromEvent, of } from 'rxjs';
import { mergeMap, delay, map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mouse-click',
  templateUrl: './mouse-click.component.html',
  styleUrls: ['./mouse-click.component.css']
})
export class MouseClickComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.mouse();
  }


  mouse() {
    
    const click$ = fromEvent(document, 'click'); // streams
    
    click$
      .pipe(
        map((e) =>
            ({
              x: (e as MouseEvent).clientX,
              y: (e as MouseEvent).clientY,
              timestamp: Date.now()
            })            
          ),
        delay(1000)
      )      
      .subscribe(r => console.log('Saved!', r));
  }

  method_1() {
    this.http.get("/assets/test.json")
      .pipe(        
        map (resp => {
            return resp;
        })
      )
      .subscribe(response=>console.log(response));
  }

  outerRequest() {
    this.http.get("https://mail.ru/")
      .subscribe(
        response => console.log(response),
        (error:HttpErrorResponse) => {
                console.log(error.error);
                console.log(error.status);
                console.log(error);}
        );
  }

}
