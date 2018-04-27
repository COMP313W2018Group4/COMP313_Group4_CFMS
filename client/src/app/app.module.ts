import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule} from "./routes/routing.module";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardCustomerComponent } from './components/customer/dashboard-customer/dashboard-customer.component';
import { NewFeedbackComponent } from './components/customer/feedback/new-feedback/new-feedback.component';
import { ListFeedbackComponent } from './components/customer/feedback/list-feedback/list-feedback.component';

import { AccountService } from './services/account.service';
import { FeedbackService } from "./services/feedback.service";
import { AdminService } from "./services/admin.service";



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    DashboardCustomerComponent,
    NewFeedbackComponent,
    ListFeedbackComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AccountService,
    FeedbackService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
