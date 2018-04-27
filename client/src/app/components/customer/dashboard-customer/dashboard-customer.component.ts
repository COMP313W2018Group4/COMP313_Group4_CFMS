import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from "../../../services/feedback.service";


@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html'
})
export class DashboardCustomerComponent implements OnInit
{
  allFeedCount;
  currentFeedCount;
  user;

  constructor( private router: Router, private feedbackService: FeedbackService)
  {
    this.user= sessionStorage.getItem('userId');
    this.getAllFeedbackCountByUser();
    this.getCurrentFeedbackCountByUser();
  }

  getAllFeedbackCountByUser()
  {
    this.feedbackService.getAllFeedbackCountByUser(this.user).subscribe(res=>
    {
      if(res.count)
      {
        this.allFeedCount= res.count;
      }
      else {
        this.allFeedCount= 0;
      }
    })
  }

  getCurrentFeedbackCountByUser()
  {
    this.feedbackService.getCurrentFeedbackCountByUser(this.user).subscribe(res=>
    {
      if(res.count)
      {
        this.currentFeedCount= res.count;
      }
      if (res.empty)
      {
        this.currentFeedCount= 0;
      }
    });
  }

  ngOnInit() {
  }

}
