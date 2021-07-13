import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { dematerialize, materialize, delay, tap, switchMap, map } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRtaXRyeSIsInJvbGVzIjpbImFkbWluIiwiZGV2ZWxvcGVyIiwidXNlciJdfQ.JieTi8d34xqh0jZKOmSdil-8G2qww9LyJfehNUevS7A";

  //token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRtaXRyeSIsInJvbGVzIjpbImRldmVsb3BlciIsInVzZXIiXX0.t4RZ_hdZr7UbeYPlqI__8mf8CvT9z2fSkMUTf-sqBds";
  
  constructor(private http: HttpClient) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, headers, body } = request;
    const self = this;

    return of(null)            
            .pipe(
              switchMap(handleRoute),
              materialize(), // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
              delay(500),
              dematerialize());

            

            function handleRoute(){    
            switch (true) {              

              case url.search("/catalog/")!==-1 && method=="GET":          
                let id = url.substr(url.search("/catalog/")+9);
                return self.http.get("/assets/catalog.json")
                 .pipe(                  
                  map(response => new HttpResponse({body: (response as any[]).find(elem => elem.id==id), status: 200})
                    
                  )
                );

              case url.endsWith("/catalog") && method=="GET":          
                return self.http.get("/assets/catalog.json")
                 .pipe(                  
                  map(response => new HttpResponse({body:response, status: 200})
                  )
                );


              case url.endsWith("/orders") && method=="GET":                
                if (headers.get('Authorization') && (headers.get('Authorization') == "Bearer "+self.token))
                  return self.http.get("assets/test.json")
                    .pipe (                    
                      map (resp => new HttpResponse({body: resp, status: 200}))
                      )
                return throwError({status:401, error: "Access denied!"});                

                // return self.http.get("assets/test.json")
                //     .pipe (                    
                //         map (
                //           resp => {
                //             console.log(headers);
                //             if (headers.get('Authorization') && (headers.get('Authorization') == "Bearer "+self.token))
                //               return new HttpResponse({body: resp, status: 200})
                //             throw ({status:401, error: "Access denided!"});                                                        
                //           }
                //         )
                //       )                                                 

              case url=="https://myapp.com/authentication" && method=="POST":
                if ((body as any).email == "dsds2020@domain.com" && (body as any).password == "123") 
                    return of(new HttpResponse({body:{token:self.token}, status: 200}))
                return throwError({status:401, error:"User's name or Password are incorrect!"});

              
              case url=="https://mail.ru/" && method=="GET":          
                return self.http.get("/assets/test.json")
                 .pipe(
                  //switchMap(response => of(new HttpResponse({body:response, status: 200}))
                  map(response => new HttpResponse({body:response, status: 200})
                  )
                );
            

              case url=="https://mail.ru/bug" && method=="GET":          
                return throwError({status:500, error:"something's wrong..."});


              default:          
                return next.handle(request).pipe(
                  tap(
                    resp=>console.log(resp), 
                    error => console.log(error)
                    )
                );
            }    
          }
                            
  }

}
