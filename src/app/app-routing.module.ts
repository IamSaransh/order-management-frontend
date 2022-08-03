import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { PlaceReturnComponent } from './views/home/return/return.component';
import { HomeComponent } from './views/home/home.component';
import { OrdersComponent } from './views/home/orders/orders.component';
import { ProfileComponent } from './views/home/profile/profile.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: HomeComponent, canActivate: [AuthenticationGuard],
    children: [
      {path: 'profile' , component: ProfileComponent },
      {path: 'management' , component: PlaceReturnComponent},
      {path: 'returns' , component: OrdersComponent}
    ]},

  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
