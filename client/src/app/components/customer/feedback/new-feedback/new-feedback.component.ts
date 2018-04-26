import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from "../../../../models/feedback";
import { FeedbackService } from "../../../../services/feedback.service";
import { AccountService } from "../../../../services/account.service";
import { AdminService } from "../../../../services/admin.service";

@Component({
  selector: 'app-new-feedback',
  templateUrl: './new-feedback.component.html'
})
export class NewFeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  user;
  firstName;
  lastName;
  email;
  companies;
  date;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private feedbackService: FeedbackService, private accountService: AccountService,
              private adminService: AdminService)
  {
    this.user= sessionStorage.getItem('userId');
    this.createForm();
    this.getCurrentUser();
    this.getAllCompanies();
    this.currentDate();
  }

  // Function to create login form
  createForm()
  {
      this.feedbackForm= this.formBuilder.group // Create Angular 2 Form when component loads
      ({
        date: ['', Validators.required],
        company: ['', Validators.required],
        feedback: ['', Validators.required, Validators.minLength(10)]
      })
  }

  currentDate()
  {
    this.date= new Date().toISOString().substring(0, 10);
    console.log(this.date);
  }

  submitFeedback()
  {
    const feedback= new Feedback
    (
      this. feedbackForm.value.date,
      this. feedbackForm.value.company,
      this. feedbackForm.value.feedback
    );

    this.feedbackService.submitFeedback(this.user, feedback).subscribe(res=>{});
  }

  getCurrentUser()
  {
    this.accountService.getCurrentUser(this.user).subscribe(res=>
      {
        if(res)
        {
          this.firstName= res.firstName;
          this.lastName= res.lastName;
          this.email= res.email;
          console.log("User info filled")
        }
        else
        {
          console.log("No user")
        }
      })
  }

  getAllCompanies()
  {
    this.adminService.getAllCompanies().subscribe(res=>
    {
      if(res)
      {
        this.companies= res.companies;
      }
      else
      {
        console.log("No company found")
      }

    })
  }

  ngOnInit()
  {

  }

}
