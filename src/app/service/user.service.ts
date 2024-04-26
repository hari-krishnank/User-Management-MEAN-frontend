import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usercred, Userinfo, Users } from '../Store/Model/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  APIBaseUrl = 'http://localhost:5000/api'

  UserRegistration(userdata: Users): Observable<any> {
    console.log(userdata);
    return this.http.post(`${this.APIBaseUrl}/register`, userdata, { observe: 'response' })
  }

  UserLogin(userdata: Usercred): Observable<any> {
    console.log('Eda Mone...!');

    console.log(userdata);
    // console.log('working.......');
    // return this.http.get<Userinfo[]>(`${this.APIBaseUrl}/login`+'?email='+userdata.email+'&password='+userdata.password)
    return this.http.post<Userinfo[]>(`${this.APIBaseUrl}/login`, userdata, { observe: 'response' });
  }

  VerifyToken(token: string): Observable<any> {
    return this.http.post(`${this.APIBaseUrl}/verifyToken`, { token });
  }

  GetAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>('http://localhost:5000/api/admin/users');
  }


  deleteUser(userId: string): Observable<any> {
    console.log('userId',userId);
    
    return this.http.post(`${this.APIBaseUrl}/admin/deleteUser/${userId}`, null);
  }

  CreateUser(userdetails: Users): Observable<any> {
    console.log(userdetails);
    return this.http.post(`${this.APIBaseUrl}/admin/createuser`, userdetails)
  }

  getUser(userId: string): Observable<any> {
    console.log('userdata',userId);
    
    return this.http.get<any>(`${this.APIBaseUrl}/admin/editDetails/${userId}`);
  }

  updateUser(userId: string, userData: Users): Observable<any> {
    console.log('edit',userId);
    
    return this.http.post(`${this.APIBaseUrl}/admin/editUser/${userId}`, userData);
  }
}