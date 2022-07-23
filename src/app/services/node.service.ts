import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  public url = 'http://localhost:1000/'

  constructor(public http: HttpClient) { }

  register(obj:any){
    return this.http.post(`${this.url}user/register`, obj)
  }
  addPurchase(purchase:any){
    return this.http.post(`${this.url}purchases/addPurchase`, purchase)
  }
}
