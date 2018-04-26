import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from "../../models/user";
import { AccountService } from "../../services/account.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  user;
  form: FormGroup;
  firstName;
  errorMessage;
  error:boolean;

  constructor(private router: Router, private formBuilder: FormBuilder, private accountService: AccountService)
  {
    this.createForm();
  }
  // Function to create login form
  createForm()
  {
    this.form= this.formBuilder.group
    ({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // Function to submit form and login user
  login()
  {
    // Create user object from user's input
    const user= new User
    (
      '','',
      this.form.value.email,
      this.form.value.password
    );

    // Function to store user's token in client local storage
    this.accountService.login(user).subscribe(res=>
      {
        if(res.userId)
        {
          this.user= res.userId;
          this.firstName= res.firstName;
          sessionStorage.setItem('userId', res.userId);
          this.router.navigate(['customer-dashboard']); // Navigate to dashboard view
        }
        else
        {
          this.error= true;
          this.errorMessage= "Invalid username or password";
        }
      });
  }

  logout()
  {
    sessionStorage.clear();
    this.accountService.logout().subscribe(res =>res);
    sessionStorage.setItem('userStatus', "loggedOut");
  }

  ngOnInit()
  {
  }

}
