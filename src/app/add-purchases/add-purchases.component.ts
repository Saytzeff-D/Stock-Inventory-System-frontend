import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-add-purchases',
  templateUrl: './add-purchases.component.html',
  styleUrls: ['./add-purchases.component.css']
})
export class AddPurchasesComponent implements OnInit {
  myControl = new FormControl('')
  public commodityName:String
  public qty:any
  public qtyType:String
  public wholesalePrice:any
  public pricePerUnit:any
  public retailPrice:any
  public profit:any
  public progressStatus:Boolean = false
  public errorStatus:Boolean = false
  public error:any;

  constructor(public nodeServer: NodeService, public dialogRef: MatDialog) { }

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
    this.commodityName = ''
    this.qty = ''
    this.qtyType = ''
    this.wholesalePrice = ''
    this.pricePerUnit = ''
    this.retailPrice = ''
    this.profit = ''
  }
  onDoneClick(){
    this.progressStatus = true
    let purchases = { commodityName: this.commodityName, qty: this.qty, qtyType: this.qtyType, wholesalePrice: this.wholesalePrice, unitPrice: this.pricePerUnit, retailPrice: this.retailPrice, profit: this.profit }
    console.log(purchases)
    this.nodeServer.addPurchase(purchases).subscribe((res:any)=>{
      console.log(res)
      if(res.err){
        if(res.err.name == 'ValidationError'){
          this.progressStatus = false
          this.errorStatus = true
          this.error = 'All fields are required'
        }else if(!res.err.reason.stale){
          this.progressStatus = false
          this.errorStatus = true
          this.error = 'Error due to network connectivity'
        }else{}
      }else if(res.message == 'Purchase Added Successfully'){
        this.progressStatus = false
        this.emptyInput()
        this.dialogRef.closeAll()
      }else{
        this.progressStatus = false
        this.errorStatus = true
        this.error = 'An error has occured, pls try again'
      }
      // this.emptyInput()
    })
  }

}
