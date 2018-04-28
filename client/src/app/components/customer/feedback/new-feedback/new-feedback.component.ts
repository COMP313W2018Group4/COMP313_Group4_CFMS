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
  message;
  errorMessage;

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
        company: [''],
        feedback: ['']
      })
  }

  currentDate()
  {
    this.date= new Date().toISOString().substring(0, 10);
    console.log(this.date);
  }

  submitFeedback()
  {
    console.log(this.feedbackForm.value.date+ " "+  this.feedbackForm.value.company+ " "+  this.feedbackForm.value.feedback);
    const feedback= new Feedback
    (
      this.user,
      this.firstName,
      this.lastName,
      this.email,
      this.date,
      this.feedbackForm.value.company,
      this.feedbackForm.value.feedback
    );

    this.feedbackService.submitFeedback(feedback).subscribe(res=>
    {
      if(res.feedback)
      {
        this.message= "success";
        this.errorMessage=null;
        this.feedbackForm.reset();
        this.feedbackForm.value.date= this.date;
      }
      else
      {
        this.message=null;
        this.errorMessage= "Failed to submit feedback";
      }
    });
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
