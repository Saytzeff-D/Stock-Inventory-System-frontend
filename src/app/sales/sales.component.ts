import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private _fb: FormBuilder) { }

  get items(){
    return this.salesForm.controls['items'] as FormArray
  }
  get itemForm(){
    return this.salesForm.get('items') as FormGroup
  }

  ngOnInit(): void {
    const itemForm = this._fb.group({
      stockName: ['', Validators.required],
      qty: ['', Validators.required],
      actualPrice: ['', Validators.required],
      paidAmount: ['', Validators.required],
      creditAmount: ['', Validators.required]
    })
    this.items.push(itemForm)

  }

  addSales(){
    console.log(this.salesForm.value)
  }

}
