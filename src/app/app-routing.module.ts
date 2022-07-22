import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { LayoutBackgroundComponent } from './layout-background/layout-background.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { AnonymousLoginComponent } from './anonymous-login/anonymous-login.component';
import { SystemOverviewComponent } from './system-overview/system-overview.component';
import { PurchasesComponent } from './purchases/purchases.component';

const routes: Routes = [
  {path: '', redirectTo: 'layout/login', pathMatch: 'full'},
  {path: 'layout', component: LayoutBackgroundComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'anonymous', component: AnonymousLoginComponent}
  ]},
  {path: 'system', component: SystemComponent, children: [
    {path: 'overview', component: SystemOverviewComponent},
    {path: 'purchases', component: PurchasesComponent}
  ]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
