import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu'
import { MatPaginator } from '@angular/material/paginator';
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
  constructor(public dialog: MatDialog, public nodeServer: NodeService) { }
  displayedColumns: string[] = ['position', 'stockName', 'qty', 'qtyType', 'wholesalePrice', 'unitPrice', 'retailPrice', 'profit'];
  
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.nodeServer.getPurchase().subscribe((res:any)=>{
      console.log(res)
      if(res.purchases){
        this.PURCHASE_DATA = res.purchases
      }else{}
    })
  }
  
  ngAfterViewInit(): void {
      // this.dataSource.paginator = this.paginator
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddPurchasesComponent, {restoreFocus: false, width: '600px'})

    dialogRef.afterClosed().subscribe((result) =>{
      this.ngOnInit()
      this.menuTrigger.focus()
    })
  }


}
