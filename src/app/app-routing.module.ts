import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './services/auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SpendingComponent } from './spending/spending.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
        {
          path: 'categories',
          component: CategoriesComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'transaction',
          component: TransactionComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'spending',
          component: SpendingComponent,
          canActivate: [AuthGuard]
        },
        {
          path: '',
          component: SpendingComponent,
          canActivate: [AuthGuard]
        }
    ]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
