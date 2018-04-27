import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from "../../../services/admin.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from "../../../services/account.service";
import {User} from "../../../models/user";


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

  userDetailsForm;
  userDetailsId;
  detailsFirstName;
  detailsLastName;
  detailsEmail;
  message;

  constructor(private router: Router,private accountService: AccountService,
              private adminService: AdminService,private formBuilder: FormBuilder,)
  {
    this.userDetailsId= sessionStorage.getItem('userDetailsId');
    this.getUserDetails();
    this.createForm()
  }

  ngOnInit() {
  }

  createForm()
  {
    this.userDetailsForm= this.formBuilder.group // Create Angular 2 Form when component loads
    ({
      firstName: [this.detailsFirstName],
      lastName: [this.detailsLastName],
      email: [this.detailsEmail],
      password: ['']
    })
  }

  updateUser(userId: string)
  {
    const user = new User
    (
      this.userDetailsForm.value.firstName,
      this.userDetailsForm.value.lastName,
      this.userDetailsForm.value.email,
      this.userDetailsForm.value.password
    );

    this.accountService.updateUser(userId, user).subscribe(res =>
    {
      if (res.user)
      {
        this.message="User details have been updated."
      }

    });
  }

  deleteUser(userId: string)
  {
    this.accountService.deleteUser(userId).subscribe(res =>
    {
      if (res.user)
      {
        this.message="User have been deleted";
        this.userDetailsForm.reset();
      }
    });
  }

  getUserDetails()
  {
    this.adminService.getUserDetails(this.userDetailsId).subscribe(res=>
    {
      if(res.user)
      {
          this.detailsFirstName= res.firstName;
          this.detailsLastName= res.lastName;
          this.detailsEmail= res.email;
      }
    })
  }

}
