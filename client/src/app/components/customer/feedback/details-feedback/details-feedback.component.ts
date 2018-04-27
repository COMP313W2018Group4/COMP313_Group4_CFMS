import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from "../../../../services/feedback.service";
import { AccountService } from "../../../../services/account.service";


@Component({
  selector: 'app-details-feedback',
  templateUrl: './details-feedback.component.html'
})
export class DetailsFeedbackComponent implements OnInit {

  feedId;
  message;
  user;
  firstName;
  lastName;
  email;
  error;
  feedbackDate;
  feedbackCompany;
  feedbackComment;
  feedbackId;


  constructor(private router: Router,
    private feedbackService: FeedbackService, private accountService: AccountService
  )
  {
    this.feedId= sessionStorage.getItem('feedbackId');
    this.user= sessionStorage.getItem('userId');
    this.getFeedbackDetails();
    this.getCurrentUser();
  }

  ngOnInit() {
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

  getFeedbackDetails()
  {
    this.feedbackService.viewFeedback(this.feedId).subscribe(res=>
    {
      if(res.feedback)
      {
        this.feedbackDate= res.date;
        this.feedbackCompany= res.company;
        this.feedbackComment= res.comment;
        this.feedbackId= res.feedback;
      }
      if(res.empty)
      {
        this.message= "No feedback found";
      }
      else {
        console.log("error");
      }
    })
  }
  deleteFeedback(feedbackId: string)
  {
    this.feedbackService.deleteFeedback(feedbackId).subscribe(res=>
    {
      if(res.feedback)
      {
        this.message= "Your feedback has been deleted";
      }
      if(res.empty)
      {
        this.error= "Failed to remove feedback";
      }
    })
  }

}
