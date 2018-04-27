import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { RegisterComponent } from "../components/register/register.component";
import { DashboardCustomerComponent } from "../components/customer/dashboard-customer/dashboard-customer.component";
import { NewFeedbackComponent } from "../components/customer/feedback/new-feedback/new-feedback.component";
import { ListFeedbackComponent } from "../components/customer/feedback/list-feedback/list-feedback.component";
import { DetailsFeedbackComponent} from "../components/customer/feedback/details-feedback/details-feedback.component";
import { DashboardAdminComponent } from "../components/admin/dashboard-admin/dashboard-admin.component";


const appRoutes: Routes =
[
    { path: 'home', component: HomeComponent},
    { path: 'register', component: RegisterComponent},

    { path: 'customer-dashboard', component: DashboardCustomerComponent},
    { path: 'new-feedback', component: NewFeedbackComponent},
    { path: 'list-feedback', component: ListFeedbackComponent},
    { path: 'detail-feedback', component: DetailsFeedbackComponent},

    { path: 'admin-dashboard', component: DashboardAdminComponent},

    { path: '**', component: DashboardAdminComponent},
];

@NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})

export class RoutingModule{}
