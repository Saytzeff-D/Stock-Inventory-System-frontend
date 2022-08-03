import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import { NodeService } from '../services/node.service';

export interface DialogData {
  stockArr: ['']
}
@Component({
  selector: 'app-add-purchases',
  templateUrl: './add-purchases.component.html',
  styleUrls: ['./add-purchases.component.css']
})

export class AddPurchasesComponent implements OnInit {
  commodityName = new FormControl('')
  // public commodityName:String
  public qty:any
  public qtyType:String
  public wholesalePrice:any
  public pricePerUnit:any
  public retailPrice:any
  public profit:any
  public progressStatus:Boolean = false
  public errorStatus:Boolean = false
  public error:any;
  filteredItems: Observable<string[]>

  constructor(public snackbar: MatSnackBar, public nodeServer: NodeService, public dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.filteredItems = this.commodityName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    )
  }
  private _filter (value: string): string [] {
    const filterValue = value.toLowerCase()
    return this.data.stockArr.filter(each => each.toLowerCase().includes(filterValue))
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
    this.qty = ''
    this.qtyType = ''
    this.wholesalePrice = ''
    this.pricePerUnit = ''
    this.retailPrice = ''
    this.profit = ''
  }
  onDoneClick(){
    this.progressStatus = true
    this.errorStatus = false
    let purchases = { commodityName: this.commodityName.value, qty: this.qty, qtyType: this.qtyType, wholesalePrice: this.wholesalePrice, unitPrice: this.pricePerUnit, retailPrice: this.retailPrice, profit: this.profit }
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
        this.snackbar.open('Purchase Added Successfully', 'Undo', {duration: 3000})
      }else{
        this.progressStatus = false
        this.errorStatus = true
        this.error = 'An error has occured, pls try again'
      }
      // this.emptyInput()
    })
  }

}
