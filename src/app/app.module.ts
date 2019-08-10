import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LogoutComponent } from './logout/logout.component';
import { CategoriesComponent } from './categories/categories.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LogoutService } from './services/logout.service';
import { AuthGuard } from './services/auth.guard';
import { CategoriesService } from './services/categories.service';
import { TransactionsService } from './services/transactions.service';


import { HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReplaceCatTypeDirective } from './directives/replace-cat-type.directive';
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SpendingComponent } from './spending/spending.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    NotFoundComponent,
    LogoutComponent,
    CategoriesComponent,
    ReplaceCatTypeDirective,
    NavbarComponent,
    TransactionComponent,
    SpendingComponent,
    TransactionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    LogoutService,
    TransactionsService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
