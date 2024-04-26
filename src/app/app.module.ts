import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './Material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { UserReducer } from './Store/User/User.Reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './Store/User/User.Effect';
import { HttpClientModule } from '@angular/common/http';
import { AppEffects } from './Store/Common/App.Effect';
import { NavComponent } from './component/nav/nav.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminCreateUserComponent } from './component/admin-create-user/admin-create-user.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AdminNavComponent } from './component/admin-nav/admin-nav.component';
import { AdminUserListComponent } from './component/admin-user-list/admin-user-list.component';
import { AdminUserEditComponent } from './component/admin-user-edit/admin-user-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    ProfileComponent,
    AdminLoginComponent,
    DashboardComponent,
    AdminCreateUserComponent,
    AdminNavComponent,
    AdminUserListComponent,
    AdminUserEditComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({user:UserReducer}),
    EffectsModule.forRoot([UserEffect,AppEffects]), 
    RouterModule,
    HttpClientModule,
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
