import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu'
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AddPurchasesComponent } from '../add-purchases/add-purchases.component';
import { NodeService } from '../services/node.service';

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
export class PurchasesComponent implements OnInit, AfterViewInit {
  public PURCHASE_DATA: PurchaseElement[] = [ ];
  public dataSource:any
  public response:any = 'Loading'
  public stockArr:Array<[]> = []

  constructor(public dialog: MatDialog, public nodeServer: NodeService) { }
  displayedColumns: string[] = ['position', 'stockName', 'qty', 'qtyType', 'wholesalePrice', 'unitPrice', 'retailPrice', 'profit'];

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.nodeServer.getPurchase().subscribe((res:any)=>{
      console.log(res)
      if(res.purchases){
        this.PURCHASE_DATA = res.purchases
        this.response = ''
        this.iterateStock()
      }else{
        this.response = 'Server Error, Pls refresh this page'
      }
    }, (error:any)=>{
      console.log(error)
      this.response = 'Server Error, Pls refresh this page'
    })
  }

  ngAfterViewInit(): void {
      // this.dataSource.paginator = this.paginator
  }

  iterateStock(){
    this.PURCHASE_DATA.map((each:any)=>{
      this.stockArr.push(each.commodityName)
    })
  }
  openDialog(){
    const dialogRef = this.dialog.open(AddPurchasesComponent, {restoreFocus: false, width: '600px', data: {stockArr: this.stockArr}})

    dialogRef.afterClosed().subscribe((result) =>{
      this.stockArr = []
      this.ngOnInit()
      this.menuTrigger.focus()
    })
  }


}
