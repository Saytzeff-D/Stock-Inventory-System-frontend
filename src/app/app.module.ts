import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutBackgroundComponent } from './layout-background/layout-background.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SystemComponent } from './system/system.component';
import { DevZoneComponent } from './dev-zone/dev-zone.component';
import { SystemOverviewComponent } from './system-overview/system-overview.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { SalesComponent } from './sales/sales.component';
import { AnonymousLoginComponent } from './anonymous-login/anonymous-login.component';
import { AddPurchasesComponent } from './add-purchases/add-purchases.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SalesHistoryComponent } from './sales-history/sales-history.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SystemComponent,
    LayoutBackgroundComponent,
    NotFoundComponent,
    DevZoneComponent,
    SystemOverviewComponent,
    PurchasesComponent,
    SalesComponent,
    AnonymousLoginComponent,
    AddPurchasesComponent,
    SalesHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
