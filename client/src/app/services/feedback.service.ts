import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Feedback } from "../models/feedback";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/do';

@Injectable()
export class FeedbackService {

  constructor(private http: HttpClient) { }

  submitFeedback(feedback: Feedback):Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('customer/feedback', feedback, httpOptions).map(res=> {return res});
  }

  getAllFeedbackCount(userId:string):Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('customer/all-feedback-count/'+ userId, httpOptions).map(res=> {return res});
  }
}
