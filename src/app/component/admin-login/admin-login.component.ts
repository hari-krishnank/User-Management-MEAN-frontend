import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private adminroute: Router) { }

  loginFormAdmin = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage: string = '';

  ProceedAdminLogin() {
    const formData = this.loginFormAdmin.value;
    this.http.post<any>('http://localhost:5000/api/admin/login', formData).subscribe(
      (response) => {
        console.log(response);
        
        // Login successful
        localStorage.setItem('adminToken', response.adminToken);

        this.adminroute.navigate(['/admin/dashboard'])
        
      },
      (error) => {
        
        this.errorMessage = error.error.message;
      }
    );
  }

  resetlogin() {
    this.loginFormAdmin.reset();
  }
}
