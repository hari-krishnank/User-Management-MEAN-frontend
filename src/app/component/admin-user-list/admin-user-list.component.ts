import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../../Store/Model/User.model';
import { getusers } from '../../Store/User/User.action';
import { Store } from '@ngrx/store';
import { getuserlist } from '../../Store/User/User.Selectors';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.css'
})
export class AdminUserListComponent implements DoCheck, OnInit {
  isadminnavvisible = false
  authenticated = false;

  userlist!: Users[];
  displayedColums: string[] = ['serialnumber', 'name', 'email', 'phone', 'action']
  datasource: any;

  constructor(private router: Router, private store: Store, private userService: UserService) { }

  ngDoCheck(): void { 
    const currentroute = this.router.url
    if (currentroute === '/login' || currentroute === '/register' || currentroute === '/admin') {
      this.isadminnavvisible = false
    } else {
      this.isadminnavvisible = true
    }
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if (token) {
      this.authenticated = true;
    }

    this.store.dispatch(getusers());
    this.store.select(getuserlist).subscribe(item => {
      this.userlist = item;
      console.log('users reached in component..', this.userlist);

      this.datasource = new MatTableDataSource<Users>(this.userlist)

      console.log(this.datasource);

      this.datasource.sort = this.sort
    })
  }


  deleteUser(userId: string) { 
    console.log(userId);
    
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
          
          this.store.dispatch(getusers());
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  editUser(userId: string){
    console.log('edit',userId);
    this.router.navigate(['/admin/edituser',userId]);
  }
  

  onLogout() {
    localStorage.removeItem('adminToken');

    this.router.navigate(['/admin']);
  }
}

