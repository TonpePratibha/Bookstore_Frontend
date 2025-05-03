import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

 
   constructor(private http: HttpService,private httpclient:HttpClient) {}


   getBooks(){
  


    let headers={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
         
  
      })
  
    };
    return this.http.getService("https://localhost:7264/api/books",false,headers);
  }

}
