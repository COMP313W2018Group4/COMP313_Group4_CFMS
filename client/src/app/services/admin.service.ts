import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Company} from "../models/company";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/do';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAllCompanies():Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('admin/getAllCompanies/', httpOptions).map(res=> {return res;});
  }

  getTotalUserCount():Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('admin/total-user-count/', httpOptions).map(res=> {return res;});
  }

  getAllUser():Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('admin/all-user/', httpOptions).map(res=> {return res;});
  }

  getAllFeedback():Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('admin/all-feedback/', httpOptions).map(res=> {return res;});
  }

  getUserDetails(userId:String):Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('admin/user-details/'+ userId, httpOptions).map(res=> {return res;});
  }

  getFeedbackDetails(feedbackId:String):Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('admin/feedback-details/'+ feedbackId, httpOptions).map(res=> {return res;});
  }

  getTotalCompanyCount():Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('admin/total-company-count/', httpOptions).map(res=> {return res;});
  }

  updateCompany(companyId: String, company):Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('admin/update-company/'+companyId,company, httpOptions).map(res=> {return res;});
  }

  addCompany(company: Company):Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('admin/add-company',company, httpOptions).map(res=> {return res;});
  }

  deleteCompany(companyId: String):Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('admin/delete-company/'+companyId, httpOptions).map(res=> {return res;});
  }

}
