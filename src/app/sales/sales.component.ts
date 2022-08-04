import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

public salesForm = this._fb.group({
  customerName: ['', Validators.required],
  items: this._fb.array([])
})
public inputArray: any = [0]
filteredItems: Observable<string[]>
public PURCHASE_DATA:any = []
public allStocks:any = []
public error:any = ''

  constructor(private _fb: FormBuilder, public nodeServer: NodeService) { }

  get items(){
    return this.salesForm.controls['items'] as FormArray
  }

  ngOnInit(): void {
    this.addMoreItem()
    console.log(this.items)
    this.filteredItems = this.items.valueChanges.pipe(
      startWith(''),
      map((value:any) => this._filter(value.commodityName || ''))
    )
    this.nodeServer.getPurchase().subscribe((res:any)=>{
      console.log(res)
      if(res.purchases){
        this.PURCHASE_DATA = res.purchases
        this.iterateStock()
      }else{}

    })
  }
  private _filter (value: string): string [] {
    const filterValue = value.toLowerCase()
    return this.allStocks.filter((each:any) => each.toLowerCase().includes(filterValue))
  }

  addMoreItem(){
    const itemForm = this._fb.group({
      commodityName: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      actualPrice: new FormControl('', Validators.required),
      paidAmount: new FormControl('', Validators.required),
      creditAmount: new FormControl('', Validators.required)
    })
    this.items.push(itemForm)
  }
  iterateStock(){
    this.PURCHASE_DATA.map((each:any)=>{
      this.allStocks.push(each.commodityName)
    })
  }
  removeItem(index:number){
    this.items.removeAt(index)
  }
  onQtyChange(i:any){
    let stockObj = this.PURCHASE_DATA.find((each:any)=>(each.commodityName.toLowerCase() == this.items.value[i].commodityName.toLowerCase()))
    if(stockObj == undefined){
      this.error = `${this.items.value[i].commodityName} has not been added to stock`
    }else{
      this.items.value[i].actualPrice = Number(this.items.value[i].qty) * Number(stockObj.retailPrice)
    }
  }

  addSales(){
    console.log(this.salesForm.value)
  }

}
