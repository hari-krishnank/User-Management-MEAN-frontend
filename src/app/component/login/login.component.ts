import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usercred } from '../../Store/Model/User.model';
import { Store } from '@ngrx/store';
import { beginLogin } from '../../Store/User/User.action';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private store: Store, private userService: UserService) {

  }

  loginForm = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  })

  ProceedLogin() {
    if (this.loginForm.valid) {
      const _obj: Usercred = {
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string
      }
      this.store.dispatch(beginLogin({ usercred: _obj }))
      console.log('Working......');
      console.log(_obj);

      // Verify token after login
      const token = localStorage.getItem('token');
      console.log('token kitti verify....', token);

      if (token) {
        this.userService.VerifyToken(token).subscribe((response: any) => {
          if (response.valid) {
            console.log('Token is valid');
          } else {
            console.log('Token is invalid');
          }
        });
      } else {
        console.log('Token not found');
      }
    }
  }

  resetlogin() {
    this.loginForm.reset();
  }
}
