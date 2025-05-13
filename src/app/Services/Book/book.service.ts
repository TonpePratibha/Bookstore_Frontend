import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

 
   constructor(private http: HttpService) {}


   getBooks(){
  


    let headers={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
         
  
      })
  
    };
    return this.http.getService("https://localhost:7264/api/books",false,headers);
  }


  getBookById(id:number){
    let headers={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
      })
    };
    return this.http.getService(`https://localhost:7264/api/books/${id}`,false,headers)
  }



  getRecentBooks(){
    let headers={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
      })
  
    };
    return this.http.getService("https://localhost:7264/api/books/recent",false,headers);
  }


  
  sortBooksAsc(){
  
    let headers={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
      }),
   responseType: 'json' as 'json' 
    };
    return this.http.getService("https://localhost:7264/api/books/sortprice_asc",false,headers);
  }


   sortBooksDesc(){
    let headers={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
         
      })
  
    };
    return this.http.getService("https://localhost:7264/api/books/sortprice_desc",false,headers);
  }


  // searchBook(search:string){
  //   let headers={
  //     headers:new HttpHeaders({
  //       'Content-Type':'application/json',
  //     }),
  //      responseType: 'json' as const
  //   };
  //   return this.http.getService(`https://localhost:7264/api/books/search?search=${encodeURIComponent(search)}`,false,headers)
  // }


 

// searchBook(search: string) {
//   const headers = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//     }),
//   };
//   return this.http.getServicee<any[]>(`https://localhost:7264/api/books/search?search=${encodeURIComponent(search)}`, headers);
// }



// searchBook(search: string) {
//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json'
//     }),
//     responseType: 'json' as const
//   };

//   return this.http.getServicee<any[]>(
//     `https://localhost:7264/api/books/search?search=${search}`,
//     false,
//     httpOptions
//   );
// }

  
  getPages(page:number){
    let headers={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
      })
    };
    return this.http.getService(`https://localhost:7264/api/books/pages?page=${page}`,false,headers)
  }

}
