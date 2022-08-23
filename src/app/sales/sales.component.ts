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
public unitPrice:any = ''
public isLoading = false

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

  onSelectQtyType(e:any, i:number){
    let qtyType = this.PURCHASE_DATA.find((each:any)=>(each.commodityName == this.items.value[i].commodityName)).qtyType
    if(qtyType !== undefined){
      if(qtyType == 'Congos'){
        if(e.value == 'Cups'){
          this.unitPrice = Number(this.items.value[i].actualPrice) / 10
          this.items.at(i).patchValue({actualPrice: Number(this.items.value[i].actualPrice) / 10})
        }else if(e.value == 'Congos'){
          this.unitPrice = this.PURCHASE_DATA.find((each:any)=>(each.commodityName == this.items.value[i].commodityName)).retailPrice
          this.items.at(i).patchValue({actualPrice: this.PURCHASE_DATA.find((each:any)=>(each.commodityName == this.items.value[i].commodityName)).retailPrice})
          this.error = ''
        }else this.error = `Type ${e.value} does not exist on the selected commodity`
      }else if(qtyType == 'Cups'){
        if(e.value == 'Cups'){
          this.unitPrice = this.PURCHASE_DATA.find((each:any)=>(each.commodityName == this.items.value[i].commodityName)).retailPrice
          this.error = ''
        }else this.error = 'Commodity can only be sold in Cups'
      }else{
        this.unitPrice = this.PURCHASE_DATA.find((each:any)=>(each.commodityName == this.items.value[i].commodityName)).retailPrice
      }
    }else{}
  }
  addMoreItem(){
    const itemForm = this._fb.group({
      commodityName: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      qtyType: new FormControl('', Validators.required),
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
    this.error = ''
    let stockObj = this.PURCHASE_DATA.find((each:any)=>(each.commodityName.toLowerCase() == this.items.value[i].commodityName.toLowerCase()))
    if(stockObj == undefined){
      this.error = `${this.items.value[i].commodityName} has not been added to stock`
    }else{
      this.items.at(i).patchValue({actualPrice: Number(this.items.value[i].qty) * Number(this.unitPrice)})
    }
  }
  calcActualPrice(e:any, i:number){
    let sale = this.PURCHASE_DATA.find((each:any)=>(each.commodityName == e.option.value))
    sale == undefined ?  '' : this.items.at(i).patchValue({actualPrice: sale.retailPrice})
  }
  calcCreditAmount(i:number){
    this.items.at(i).patchValue({creditAmount: Number(this.items.value[i].actualPrice) - Number(this.items.value[i].paidAmount)})
  }

  addSales(){
    this.error = ''
    if(this.salesForm.valid){
      this.isLoading= true
      this.nodeServer.addSales(this.salesForm.value).subscribe((res:any)=>{
        console.log(res)
        if(res.status){
          this.salesForm.reset()
          this.isLoading = false
        }else{
          this.isLoading = false
          this.error = res.message
        }
      }, ()=>{
        this.error = 'An error has occurred'
        this.isLoading = false
      })
    }else{}
  }

}
