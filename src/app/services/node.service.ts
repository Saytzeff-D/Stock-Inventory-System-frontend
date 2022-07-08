import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(public http: HttpClient) { }

  register(obj:any){
    return this.http.post('http://localhost:1000/user/register', obj)
  }
}
