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
  phone = new FormControl('', [Validators.required, Validators.maxLength(10)])
  pword = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g)])

  constructor(public nodeServer: NodeService) { }
  public matchPwordError:boolean = true
  public disableBtn = false

  ngOnInit(): void {
  }

  register(){
    if (this.fullName.value !== '' && this.email.value !== '' && this.phone.value !== '' && this.pword.value !== '') {
      this.disableBtn = true
      let regObj = {fullName: this.fullName.value, email: this.email.value, phone: '+234' + this.phone.value, pword: this.pword.value}
      console.log(regObj)
      this.nodeServer.register(regObj).subscribe((res)=>{
        console.log(res)
      })
    } else {
      console.log('Incomplete Form')
    }
  }

}
