import { Component, OnInit } from '@angular/core';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.css']
})
export class SalesHistoryComponent implements OnInit {
  public error = ''
  public isLoading = true
  public arrayOfSales:any = []

  constructor(public nodeService: NodeService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.nodeService.getSales().subscribe((res: any)=>{
      console.log(res)
      if(res.status){
        this.arrayOfSales = res.sales
        this.isLoading = false
      }else{
        this.error = 'Internal Server Error'
        this.isLoading = false
      }
    }, err=>{
      console.log(err)
      this.error = 'Network Error, 404'
      this.isLoading = false
    })
  }

}
