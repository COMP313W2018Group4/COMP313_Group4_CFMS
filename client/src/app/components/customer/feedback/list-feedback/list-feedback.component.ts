import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from "../../../../services/feedback.service";
import { AccountService } from "../../../../services/account.service";
import { AdminService } from "../../../../services/admin.service";

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html'
})
export class ListFeedbackComponent implements OnInit {

  user;
  firstName;
  lastName;
  email;
  feedbackList;
  message;

  constructor(private router: Router,
    private feedbackService: FeedbackService,
    private accountService: AccountService
  )
  {
    this.user= sessionStorage.getItem('userId');
    this.getCurrentUser();
    this.getCustomerFeedback()
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

  getCustomerFeedback()
  {
    this.feedbackService.getCustomerFeedback(this.user).subscribe(res=>
    {
        if(res.feedback)
        {
          this.feedbackList= res.feedback;
        }
        if(res.empty)
        {
          this.message= "No feedback found";
        }
    })
  }

  viewFeedback(feedId: string)
  {
    sessionStorage.setItem('feedbackId', feedId);
    this.router.navigate(['feedback-details']); // Navigate to dashboard view
  }
  ngOnInit() {
  }

}
