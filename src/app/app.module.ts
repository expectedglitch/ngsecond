import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { myInterceptors } from './interceptors/myInterceptors';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MouseClickComponent } from './mouse-click/mouse-click.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './services/auth-guard.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './product/product.component';



@NgModule({
  declarations: [
    AppComponent,
    MouseClickComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    AccessDeniedComponent,
    CatalogComponent,
    ProductComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: "", component:CatalogComponent},
      {path: "login", component: LoginComponent},
      {path: "admin", component: AdminComponent, canActivate: [AdminAuthGuard, AuthGuard]},
      {path: "access-denied", component: AccessDeniedComponent},
      {path: "catalog/:product", component: ProductComponent},
      // {path: "catalog", component: CatalogComponent},      
      {path: "**", component: PageNotFoundComponent}
      // {path: "", component:HomeComponent},
      // {path: "login", component: LoginComponent},
      // {path: "admin", component: AdminComponent, canActivate: [AdminAuthGuard, AuthGuard]},
      // {path: "access-denied", component: AccessDeniedComponent},
      // {path: "catalog/:product", component: ProductComponent},
      // {path: "catalog", component: CatalogComponent},      
      // {path: "**", component: PageNotFoundComponent}
    ]),    
  ],
  providers: [
    myInterceptors    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
