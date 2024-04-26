import { EntityState } from "@ngrx/entity";

export interface Users {
    username:string,
    password:string,
    confirmpassword:string,
    email:string,
    phone:string,
    is_admin: boolean
}

export interface Usercred {
    email:string,
    password:string,
}

export interface Userinfo {
    username:string,
    email:string,
   
}

export interface UserModel extends EntityState<Users> {
    
}