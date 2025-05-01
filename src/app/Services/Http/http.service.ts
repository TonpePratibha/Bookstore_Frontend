import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
constructor(private httpClient: HttpClient) {}



PostService(reqUrl: string, reqData: any, token: boolean = false, httpOptions: any = {}) {
  console.log("POST Request URL:", reqUrl); 
  console.log("POST Request Data:", reqData); 
  return this.httpClient.post(reqUrl, reqData, token ? httpOptions : {});
}

postServiceToken(url: string, reqData: any, token: boolean = true, httpOptions: any = {}) {
  return this.httpClient.post(url, reqData, token ? httpOptions : {});
}




getService(url: string, token: boolean = true, httpOptions: any = {}) {
  return this.httpClient.get(url, token ? httpOptions : {});
}

putService(url: string, reqData: any, token: boolean = true, httpOptions: any = {}) {
  return this.httpClient.put(url, reqData, token ? httpOptions : {});
}

patchService(url: string, reqData: any, token: boolean = true, httpOptions: any = {}) {
  return this.httpClient.patch(url, reqData, token ? httpOptions : {});
}
deleteService(url: string, token: boolean = true, httpOptions: any = {}) {
return this.httpClient.delete(url, token ? httpOptions : {});
}

}
