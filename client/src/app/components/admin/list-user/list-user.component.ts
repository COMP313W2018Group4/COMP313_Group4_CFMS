import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from "../../../services/account.service";
import { AdminService } from "../../../services/admin.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html'
})
export class ListUserComponent implements OnInit {

  user;
  firstName;
  email;
  message;
  userList;

  constructor(private router: Router,
              private accountService: AccountService, private adminService: AdminService)
  {
    this.user= sessionStorage.getItem('userId');
    this.getCurrentUser();
    this.getAllUser();
  }

  viewUser(userId:string)
  {
    /*this.adminService.getUserDetails(userId).subscribe(res=>
    {
      if(res.user)
      {

      }
      else
      {

      }
    })*/
    sessionStorage.setItem('userDetailsId', userId);
    this.router.navigate(['user-detail']); // Navigate to dashboard view
  }

  getCurrentUser()
  {
    this.accountService.getCurrentUser(this.user).subscribe(res=>
    {
      if(res)
      {
        this.firstName= res.firstName;
        this.email= res.email;
        console.log("User info filled")
      }
      else
      {
        console.log("No user")
      }
    })
  }

  getAllUser()
  {
    this.adminService.getAllUser().subscribe(res=>
    {
      if(res.users)
      {
        this.userList= res.users;
      }
      else
      {
        this.message= "No user found"
      }
    })
  }

  ngOnInit() {
  }

}
