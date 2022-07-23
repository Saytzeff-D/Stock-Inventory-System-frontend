import { Component, OnInit } from '@angular/core';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-add-purchases',
  templateUrl: './add-purchases.component.html',
  styleUrls: ['./add-purchases.component.css']
})
export class AddPurchasesComponent implements OnInit {
  public stockName:String
  public qty:any
  public qtyType:String
  public wholesalePrice:any
  public pricePerUnit:any
  public retailPrice:any
  public profit:any
  public progressStatus:Boolean = false

  constructor(public nodeServer: NodeService) { }

  ngOnInit(): void {
  }

  onChangeOfWholesale(){
    let unitPrice = Math.floor(parseInt(this.wholesalePrice) / this.qty)
    this.pricePerUnit = unitPrice
    if(this.profit !== ''){
      this.profit = Math.floor((this.retailPrice - this.pricePerUnit) * this.qty)
    }
  }
  onChangeOfRetail(){
    let profit = Math.floor((this.retailPrice - this.pricePerUnit) * this.qty)
    this.profit = profit
  }
  onQtyChange(){
    if(this.wholesalePrice !== '' && this.retailPrice == ''){
      this.onChangeOfWholesale()
    }else if(this.wholesalePrice !== '' && this.retailPrice !== ''){
      this.onChangeOfWholesale()
      this.onChangeOfRetail()
    }else{}
  }
  emptyInput(){
    this.stockName = ''
    this.qty = ''
    this.qtyType = ''
    this.wholesalePrice = ''
    this.pricePerUnit = ''
    this.retailPrice = ''
    this.profit = ''
  }
  onDoneClick(){
    this.progressStatus = true
    let purchases = { stockName: this.stockName, qty: this.qty, qtyType: this.qtyType, wholesalePrice: this.wholesalePrice, unitPrice: this.pricePerUnit, retailPrice: this.retailPrice, profit: this.profit }
    this.nodeServer.addPurchase(purchases).subscribe((res:any)=>{
      this.emptyInput()
      this.progressStatus = false
    })
  }

}
