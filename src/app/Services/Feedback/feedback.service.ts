import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

 token:any;
   constructor(private http :HttpService) {
     this.token = localStorage.getItem("token");
    }

addFeedback(reqData:any) {
    let headers = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
     
    return this.http.PostService('https://localhost:7264/api/feedbacks',reqData,true, headers);
  }

  getFeedback(bookId:number) {
    let headers = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
       
      })
    };
     
    return this.http.getService(`https://localhost:7264/api/feedbacks/${bookId}`,false, headers);
  }
}
