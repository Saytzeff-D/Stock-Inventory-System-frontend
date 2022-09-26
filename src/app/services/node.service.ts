import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  public url = 'http://localhost:1000/'
  public arrayOfPurchases = new BehaviorSubject([])

  constructor(public http: HttpClient) { }

  register(obj:any){
    return this.http.post(`${this.url}user/register`, obj)
  }
  addPurchase(purchase:any){
    return this.http.post(`${this.url}purchases/addPurchase`, purchase)
  }
  getPurchase(){
    return this.http.get(`${this.url}purchases/getPurchase`)
  }
  addSales(sales:any){
    return this.http.post(`${this.url}sales/addSales`, sales)
  }
  getSales(){
    return this.http.get(`${this.url}sales/allSales`)
  }
}
