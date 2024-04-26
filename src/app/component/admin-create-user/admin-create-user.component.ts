import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Users } from '../../Store/Model/User.model';
import { beginCreateUser } from '../../Store/User/User.action';
import { showalert } from '../../Store/Common/App.Action';

@Component({
  selector: 'app-admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrl: './admin-create-user.component.css'
})
export class AdminCreateUserComponent implements DoCheck, OnInit {
  isadminnavvisible = false
  authenticated = false;

  constructor(private router: Router, private builder: FormBuilder, private store: Store) { }

  crateuserform = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    password: this.builder.control('', Validators.required),
    confirmpassword: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control('', Validators.required),
  })



  ngDoCheck(): void {
    const currentroute = this.router.url
    if (currentroute === '/login' || currentroute === '/register' || currentroute === '/admin') {
      this.isadminnavvisible = false
    } else {
      this.isadminnavvisible = true
    }
  }

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if (token) {
      this.authenticated = true;
    }
  }


  ProceedCreateUser() {
    if (this.crateuserform.valid) {
      // console.log('working....');

      if (this.crateuserform.value.password === this.crateuserform.value.confirmpassword) {
        const _userobjCreate: Users = {
          username: this.crateuserform.value.username as string,
          password: this.crateuserform.value.password as string,
          confirmpassword: this.crateuserform.value.confirmpassword as string,
          email: this.crateuserform.value.email as string,
          phone: this.crateuserform.value.phone as string,
          is_admin: false
        }
        console.log(_userobjCreate);

        this.store.dispatch(beginCreateUser({ userdetails: _userobjCreate }))
      } else {
        this.store.dispatch(showalert({ message: 'Password is not matching', resulttype: 'fail' }))
      }
    }
  }
  log(){
    console.log('....button');
    
  }
  onLogout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin']);
  }
}
