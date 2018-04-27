import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/do';


@Injectable()
export class AccountService
{

  result: any;
  private currentStudent:any;
  authToken;
  user;

  constructor(private http: HttpClient)
  {}

  register(user:User): Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('account/register', user, httpOptions).map(res=> {return res;});
  }

  // Function to login user
  login(user: User): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('account/login', user, httpOptions).map(res => {return res;});
  }

  logout(): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('account/logout', httpOptions).map(res => {return res;});
  }

  getCurrentUser(userId:string): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('customer/current-user/'+ userId, httpOptions).map(res => {return res;});
  }

  updateUser(userId:string, user:User): Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('account/update-user/'+userId,user, httpOptions).map(res=> {return res;});
  }


  deleteUser(userId:string): Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('account/delete-user/'+userId, httpOptions).map(res=> {return res;});
  }

}
