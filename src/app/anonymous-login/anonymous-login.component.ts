import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anonymous-login',
  templateUrl: './anonymous-login.component.html',
  styleUrls: ['./anonymous-login.component.css']
})
export class AnonymousLoginComponent implements OnInit {

  constructor(public router: Router) { }
  secretKey = new FormControl('', Validators.required)

  public error = ''

  ngOnInit(): void {
  }

  enterSystem(){
    if(this.secretKey.value !== ''){
      if(this.secretKey.value == 'ololadedavid15'){
        this.router.navigate(['/system/overview'])
      }else{
        this.error = 'Invalid Token'
      }
    }else{}
  }

}
