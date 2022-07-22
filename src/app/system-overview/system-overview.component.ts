import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-overview',
  templateUrl: './system-overview.component.html',
  styleUrls: ['./system-overview.component.css']
})
export class SystemOverviewComponent implements OnInit {

  constructor() { }
  public price = 13500
  public analysis = 84

  ngOnInit(): void {
  }

}
