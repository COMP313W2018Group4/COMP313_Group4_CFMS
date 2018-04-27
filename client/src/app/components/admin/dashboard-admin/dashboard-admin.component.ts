import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from "../../../services/feedback.service";
import { AdminService } from "../../../services/admin.service";


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html'
})
export class DashboardAdminComponent implements OnInit
{

  allFeedCount;
  allUserCount;

  constructor(private router: Router, private feedbackService: FeedbackService,
  private adminService: AdminService)
  {
    this.getAllFeedbackCount();
    this.getTotalUserCount();
  }

  ngOnInit() {
  }

  getAllFeedbackCount()
  {
    this.feedbackService.getTotalFeedbackCountAdmin().subscribe(res=>
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

  getTotalUserCount()
  {
    this.adminService.getTotalUserCount().subscribe(res=>
    {
      if(res.count)
      {
        this.allUserCount= res.count;
      }
      else {
        this.allUserCount= 0;
      }
    })
  }

}
