import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu'
import { AddPurchasesComponent } from '../add-purchases/add-purchases.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  ngOnInit(): void {
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddPurchasesComponent, {restoreFocus: false, width: '600px'})

    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus())
  }


}
