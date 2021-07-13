import { HttpRequestsService } from './http-requests.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private service: HttpRequestsService, private router: Router) { }

  canActivate(){
    let user=this.service.getCurrentUser;
    
    console.log("sdfsd1111111")

    //if (this.service.getCurrentUser.roles.includes('admin')) return true;
    if (user && user.roles.includes('admin')) {
      console.log("here")
      return true;
    }

    this.router.navigate(['/access-denied']);
    console.log("there!")
    return false;      
    
    
  }
  
}
