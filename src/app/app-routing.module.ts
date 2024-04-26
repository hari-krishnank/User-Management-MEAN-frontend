import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AdminUserListComponent } from './component/admin-user-list/admin-user-list.component';
import { AdminCreateUserComponent } from './component/admin-create-user/admin-create-user.component';
import { AdminUserEditComponent } from './component/admin-user-edit/admin-user-edit.component';
import { userGuard } from './Guards/user.guard';
import { adminGuard } from './Guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [userGuard] },



  { path: 'admin', component: AdminLoginComponent },
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard] },
      { path: 'userlist', component: AdminUserListComponent, canActivate: [adminGuard] },
      { path: 'createuser', component: AdminCreateUserComponent, canActivate: [adminGuard] },
      { path: 'edituser/:userId', component: AdminUserEditComponent, canActivate: [adminGuard] }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
