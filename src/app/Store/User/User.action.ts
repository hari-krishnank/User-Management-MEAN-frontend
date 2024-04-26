import { createAction, props } from "@ngrx/store"
import { Usercred, Users } from "../Model/User.model"

export const BEGIN_REGISTER = '[auth] begin register'

export const BEGIN_CREATE_USER = '[auth] begin createuser'

export const BEGIN_LOGIN = '[auth] begin login'

export const GET_USERS='[user] get users'

export const GET_USER_SUCC='[user] get users succ'

export const getuserssuccess=createAction(GET_USER_SUCC,props<{userlist:Users[]}>())

export const beginRegister = createAction(BEGIN_REGISTER,props<{userdata:Users}>())
export const beginCreateUser = createAction(BEGIN_CREATE_USER,props<{userdetails:Users}>())
export const beginLogin = createAction(BEGIN_LOGIN,props<{usercred:Usercred}>())
export const getusers=createAction(GET_USERS)