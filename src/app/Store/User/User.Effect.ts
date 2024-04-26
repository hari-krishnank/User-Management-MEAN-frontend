import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../service/user.service";
import { beginCreateUser, beginLogin, beginRegister, getusers, getuserssuccess } from "./User.action";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Router } from "@angular/router";
import { showalert } from "../Common/App.Action";


@Injectable()
export class UserEffect {
    constructor(private action$: Actions, private service: UserService, private route: Router) {

    }

    _userRegister = createEffect(() =>
        this.action$.pipe(
            ofType(beginRegister),
            exhaustMap((action: any) => {
                return this.service.UserRegistration(action.userdata).pipe(
                    map((response: any) => {
                        console.log(response);

                        const token = response.headers.get('Authorization');
                        console.log(token);

                        localStorage.setItem('token', response.body.token);
                        console.log('Token stored:', token);
                        console.log('register...', action.userdata);
                        this.route.navigate([''])
                        return showalert({ message: 'Registered Successfully.', resulttype: 'pass' })
                    }),
                    catchError((_error) => of(showalert({ message: 'Registration Failed due to : ' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )
    _userCreate = createEffect(() =>
        this.action$.pipe(
            ofType(beginCreateUser),
            exhaustMap((action: any) => {
                return this.service.CreateUser(action.userdetails).pipe(
                    map((response: any) => {
                        console.log(response);

                        this.route.navigate(['/admin/userlist'])
                        return showalert({ message: 'Created Successfully.', resulttype: 'pass' })
                    }),
                    catchError((_error) => of(showalert({ message: 'User Creating Failed due to : ' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _userLogin = createEffect(() =>
        this.action$.pipe(
            ofType(beginLogin),
            exhaustMap((action: any) => {
                return this.service.UserLogin(action.usercred).pipe(
                    map((response: any) => {
                        console.log(response);

                        const token = response.headers.get('AuthorizationLogin');
                        console.log(token);

                        localStorage.setItem('token', response.body.token);
                        console.log('Token stored:', response.body.token);
                        console.log('login...', action.usercred);
                        this.route.navigate([''])
                        
                        return showalert({ message: 'Login Successfully.', resulttype: 'pass' })
                        
                    }),
                    catchError((_error) => of(showalert({ message: 'Login Failed due to : ' + _error.message, resulttype: 'fail' })))
                )
            }),
        )
    )



    _getallusers = createEffect(() =>
        this.action$.pipe(
            ofType(getusers),
            exhaustMap((action) => {
                return this.service.GetAllUsers().pipe(
                    map((data) => {
                        console.log('users kitti....', data);

                        return getuserssuccess({ userlist: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch user list', resulttype: 'fail' })))
                )
            })
        )
    )
}

