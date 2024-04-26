import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrl: './admin-user-edit.component.css'
})
export class AdminUserEditComponent implements OnInit {
  isadminnavvisible = false
  authenticated = false;
  user: any = {};
  userForm !: FormGroup;


  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder) { }
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


    this.userForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });

    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      this.userService.getUser(userId).subscribe((data: any) => {
        if (data) {
          this.user = data;
          console.log('User object:', this.user);
          this.userForm.patchValue({
            name: this.user.name,
            phone: this.user.phone
          });
        } else {
          console.log('User data not found');
        }
      }, error => {
        console.error('Error fetching user details:', error);
      });
    } else {
      console.log('User ID not found in route parameters');
    }
  }

  onSave(): void {
    if (this.user._id) {
      this.userService.updateUser(this.user._id, this.userForm.value).subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/admin/userlist']); 
      });
    } else {
      console.log('User ID not found');
    }
  }

  onLogout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin']);
  }
}
