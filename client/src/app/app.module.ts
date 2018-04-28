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
import { DetailsFeedbackComponent } from './components/customer/feedback/details-feedback/details-feedback.component';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { ListUserComponent } from './components/admin/list-user/list-user.component';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
import  { ListAdminFeedbackComponent } from "./components/admin/list-feedback/list-feedback.component";
import { FeedbackDetailsComponent } from './components/admin/feedback-details/feedback-details.component';
import { CompaniesComponent } from './components/admin/companies/companies.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    DashboardCustomerComponent,
    NewFeedbackComponent,
    ListFeedbackComponent,
    DetailsFeedbackComponent,
    DashboardAdminComponent,
    AddUserComponent,
    ListUserComponent,
    UserDetailsComponent,
    ListAdminFeedbackComponent,
    FeedbackDetailsComponent,
    CompaniesComponent
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
