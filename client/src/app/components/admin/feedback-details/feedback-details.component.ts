import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from "../../../services/admin.service";
import { AccountService } from "../../../services/account.service";
import { FeedbackService } from "../../../services/feedback.service";

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html'
})
export class FeedbackDetailsComponent implements OnInit {

  feedbackDetailsId;
  detailsFirstName;
  detailsLastName;
  detailsEmail;
  detailsDate;
  detailsCompany;
  detailsFeedback;
  feedbackIdRet;
  message;
  error;

  constructor(private router: Router,private accountService: AccountService,
              private adminService: AdminService,  private feedbackService: FeedbackService)
  {
    this.feedbackDetailsId= sessionStorage.getItem('feedbackDetailsId');
    this.getFeedbackDetails();
  }

  getFeedbackDetails()
  {
    this.adminService.getFeedbackDetails(this.feedbackDetailsId).subscribe(res=>
    {
      if(res.feedback)
      {
        this.feedbackIdRet= res.feedback;
        this.detailsFirstName= res.firstName;
        this.detailsLastName= res.lastName;
        this.detailsEmail= res.email;
        this.detailsDate= res.date;
        this.detailsCompany= res.company;
        this.detailsFeedback= res.comment;
      }
    })
  }

  deleteFeedback(feedbackId: string)
  {
    this.feedbackService.deleteFeedback(feedbackId).subscribe(res=>
    {
      if(res.feedback)
      {
        this.message= "User feedback has been deleted";
      }
      if(res.empty)
      {
        this.error= "Failed to remove feedback";
      }
    })
  }
  ngOnInit()
  {
  }

}
