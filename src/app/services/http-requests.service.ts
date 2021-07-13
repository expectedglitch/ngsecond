import { authError, wrongAuth } from './http-errors';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

interface authResp {
  token: string;
}

interface product {
  "id": number,
  "title": string,
  "image": string,
  "number_of_variations":number
}

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  jwtHelper = new JwtHelperService();  

  constructor(private http: HttpClient) { }
  
  login(form_value:any){
    return this.http.post<authResp>("https://myapp.com/authentication", form_value, {observe: 'response'})
      .pipe(
        map(response => {          
          let token=response.body!.token;
          localStorage.setItem("token", token);          
          return true;
        }),
        catchError((error:HttpErrorResponse) => {
          if (error.status == 401) throw(new wrongAuth());
          throw(new authError());
        })
      )

      // .pipe(
      //   map (response => {
      //     console.log(response);
      //     return true;
      //   }),
      //   catchError (error => {
      //     console.log(error);
      //     throw 'Error !!!!!!!!!!!!!!!!';
      //   })
      // )

  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(){    
    let token = localStorage.getItem('token');    
    if (token) return !this.jwtHelper.isTokenExpired(token);
    return false;
  }

  get getCurrentUser(){
    let token = localStorage.getItem('token'); 
    if (token) return this.jwtHelper.decodeToken(token);           
    return null;
  }


  get SaveHeaders() {
    let token = localStorage.getItem('token'); 
    let headers = new HttpHeaders();    
    return headers.append("Authorization", "Bearer "+token);
  }

  get getOrders() {    
    let options={headers: this.SaveHeaders};            
    return this.http.get("https://myapp.com/orders", options)
  }

  get getCatalog() {
    return this.http.get("https://myapp.com/catalog")
  }

  getProduct(id:string) {
    return this.http.get<product>("https://myapp.com/catalog/"+id);
  }

  testRequest() {
    // this.http.post("https://listva-aw.com/php_functions/test_php_10_07.php?sku=[11053]","blablabla")
    // .subscribe(resp => console.log(resp))
    // this.http.get("https://listva-aw.com/php_functions/test_php_10_07.php?sku=[11053]")
    // .subscribe(resp => console.log(resp))
    let params = new HttpParams().set("sku","[11053]");
    let options = {params: params};
    this.http.post("https://listva-aw.com/php_functions/test_php_10_07.php", "Bla-bla-Bal!!!", options)
    .subscribe(resp => console.log(resp))
  }

}
