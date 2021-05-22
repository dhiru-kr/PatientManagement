import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './app/auth/auth.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';

const routes: Routes = [
    {path:'', component:DashboardComponent}
    // {path:'', component:AuthComponent},
    // {path:'Home', component:DashboardComponent},
    // {path:'**', redirectTo:'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
