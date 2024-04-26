import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css'
})
export class AdminNavComponent implements DoCheck,OnInit {
  isadminnavvisible = false
  authenticated = false;

  constructor(private router: Router) { }
  ngDoCheck(): void {
    const currentroute = this.router.url
    if (currentroute === '/login' || currentroute === '/register' || currentroute === '/admin' ) {
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

  onLogout() {
    localStorage.removeItem('adminToken');
    // localStorage.removeItem('userdata');

    this.router.navigate(['/admin']);
  }
}
