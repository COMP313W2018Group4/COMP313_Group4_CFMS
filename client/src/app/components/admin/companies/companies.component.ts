import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../../services/admin.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";
import { Company } from "../../../models/company";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html'
})
export class CompaniesComponent implements OnInit {

  companyList;
  message;
  companyForm: FormGroup;
  name: String;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private router: Router)
  {
    this.createForm();
    this.getAllCompanies();
  }

  ngOnInit() {
  }
  createForm()
  {
    this.companyForm= this.formBuilder.group // Create Angular 2 Form when component loads
    ({
      name: ['', Validators.required]
    })
  }

  /*updateCompany(companyId: string)
  {
    this.adminService.updateCompany(companyId, this.companyForm.value.name).subscribe()
  }*/

  addCompany()
  {
    const company= new Company(
      this.companyForm.value.name
    );

    this.adminService.addCompany(company).subscribe(res=>
    {
      if(res.company)
      {
        this.getAllCompanies();
        this.companyForm.reset();
      }
      else
      {
        this.message= "No company found"
      }
    })
  }

  getAllCompanies()
  {
    this.adminService.getAllCompanies().subscribe(res=>
    {
      if(res) {
        this.companyList = res.companies;
      }
      {
        this.message= "No company found"
      }

    })
  }

  deleteCompany(companyId: String)
  {
    this.adminService.deleteCompany(companyId).subscribe(res=>
    {
      if(res.company)
      {
        this.getAllCompanies();
      }
      else
      {
        this.message= "No company found"
      }
    })
  }

}
