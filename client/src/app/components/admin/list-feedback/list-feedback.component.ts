import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from "../../../services/account.service";
import { AdminService } from "../../../services/admin.service";

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html'
})
export class ListAdminFeedbackComponent implements OnInit {

  feedbackList;
  message;

  constructor(private router: Router,
              private accountService: AccountService,
              private adminService: AdminService)
  {
    this.getAllFeedback();
  }

  getAllFeedback()
  {
    this.adminService.getAllFeedback().subscribe(res=>
    {
      if(res.feedback)
      {
        this.feedbackList= res.feedback;
      }
      else
      {
        this.message= "No feedback found"
      }
    })
  }

  viewFeedback(feedbackId: string)
  {
    sessionStorage.setItem('feedbackDetailsId', feedbackId);
    this.router.navigate(['feedback-details-admin']); // Navigate to dashboard view
  }


  ngOnInit() {
  }

}
