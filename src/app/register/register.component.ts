import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true
  fullName = new FormControl('', Validators.required)
  email = new FormControl('', [Validators.required, Validators.email])
  phone = new FormControl('', [Validators.required, Validators.maxLength(13)])
  pword = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g)])
  confPword = new FormControl('', Validators.required)

  constructor(public nodeServer: NodeService) { }
  public checkPword:boolean = false

  ngOnInit(): void {
  }

  confirmPword(){
    if (this.pword.value== this.confPword) {
      this.checkPword = false
      alert()
    } else {
      this.checkPword = true
    }
  }
  register(){
    let regObj = {fullName: this.fullName.value, email: this.email.value, phone: this.phone.value, pword: this.pword.value}
    console.log(regObj)
    this.nodeServer.register(regObj).subscribe((res)=>{
      console.log(res)
    })
  }

}
