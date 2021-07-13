import { HttpRequestsService } from './http-requests.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private service: HttpRequestsService, private router: Router) { }


  
  canActivate(route:any, state:RouterStateSnapshot){        
    if (this.service.isLoggedIn()) return true;

    this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}});
    return false;
  }


}
