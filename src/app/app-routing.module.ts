import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './components/news/news.component';
import { TransportComponent } from './components/transport/transport.component';
import { FoodComponent } from './components/food/food.component';
import { HealthComponent } from './components/health/health.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [AuthGuard]
  },
    {
      path: 'news',
      component: NewsComponent,
      // canActivate: [AuthGuard]
    },
    {
        path: 'transport',
        component: TransportComponent
    },
    {
        path: 'food',
        component: FoodComponent
    },
    {
        path: 'health',
        component: HealthComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: '/'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
