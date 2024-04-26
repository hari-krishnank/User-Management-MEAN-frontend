import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { showalert } from '../../Store/Common/App.Action';
import { Users } from '../../Store/Model/User.model';
import { beginRegister } from '../../Store/User/User.action';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(private builder: FormBuilder, private store: Store) { }

  registerform = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    password: this.builder.control('', Validators.required),
    confirmpassword: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control('', Validators.required),
  })

  Proceedregister() {
    if (this.registerform.valid) { 
      // console.log('working....');
      
      if (this.registerform.value.password === this.registerform.value.confirmpassword) {
        // console.log('working....');
        const _userobj: Users = {
          username: this.registerform.value.username as string,
          password: this.registerform.value.password as string,
          confirmpassword: this.registerform.value.confirmpassword as string,
          email: this.registerform.value.email as string,
          phone: this.registerform.value.phone as string,
          is_admin: false
        }
        console.log(_userobj);
        
        this.store.dispatch(beginRegister({ userdata: _userobj }))
      } else {
        this.store.dispatch(showalert({ message: 'Password is not matching', resulttype: 'fail' }))
      }
    }
  }
}
