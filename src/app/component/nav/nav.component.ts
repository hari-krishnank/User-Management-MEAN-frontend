import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements DoCheck,OnInit {
  isnavvisible = false
  authenticated = false;

  constructor(private router: Router) { }
  ngDoCheck(): void {
    const currentroute = this.router.url
    if (currentroute === '/login' || currentroute === '/register' || currentroute === '/admin' || currentroute === '/admin/dashboard' || currentroute === '/admin/userlist' || currentroute === '/admin/createuser' || currentroute.startsWith( '/admin/edituser')) {
      this.isnavvisible = false
    } else {
      this.isnavvisible = true
    }
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authenticated = true;
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userdata');
    localStorage.removeItem('profileImage')
    this.router.navigate(['/login']);
  }
}
