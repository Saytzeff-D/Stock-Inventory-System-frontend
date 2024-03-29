import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu'
import { MatPaginator } from '@angular/material/paginator';
import { AddPurchasesComponent } from '../add-purchases/add-purchases.component';
import { NodeService } from '../services/node.service';
import { MatTableDataSource } from '@angular/material/table';

export interface PurchaseElement {
  commodityName: string;
  qty: string;
  qtyType: string;
  wholesalePrice: string;
  unitPrice: string;
  retailPrice: string;
  profit: string;
  created: string
}
@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  public PURCHASE_DATA: PurchaseElement[] = [ ];
  // public dataSource:any
  public response:any = 'Loading'
  public stockArr:Array<[]> = []
  dataSource = new MatTableDataSource<PurchaseElement>(this.PURCHASE_DATA);

  constructor(public dialog: MatDialog, public nodeServer: NodeService) { }
  displayedColumns: string[] = ['commodityName', 'qty', 'qtyType', 'wholesalePrice', 'unitPrice', 'retailPrice', 'profit', 'created'];

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.nodeServer.getPurchase().subscribe((res:any)=>{
      if(res.purchases){
        this.PURCHASE_DATA = res.purchases
        this.dataSource = new MatTableDataSource<PurchaseElement>(res.purchases)
        this.iterateStock()
        this.response = 'Fetched'
        setTimeout(()=>{
          this.dataSource.paginator = this.paginator
        }, 1000)
      }else{
        this.response = 'Server Error, Pls refresh this page'
      }
    }, (error:any)=>{
      console.log(error)
      this.response = 'This is an error due to network connectivity'
    })
  }

  subscribePurchaseArray(){
    this.dataSource.paginator = this.paginator
  }
  iterateStock(){
    this.PURCHASE_DATA.map((each:any)=>{
      this.stockArr.push(each.commodityName)
    })
  }
  openDialog(){
    const dialogRef = this.dialog.open(AddPurchasesComponent, { restoreFocus: false, width: '600px', data: { stockArr: this.stockArr } })

    dialogRef.afterClosed().subscribe((result) =>{
      this.stockArr = []
      this.ngOnInit()
      this.menuTrigger.focus()
    })
  }
  refreshNow(){
    this.response = 'Loading'
    this.ngOnInit()
  }


}
