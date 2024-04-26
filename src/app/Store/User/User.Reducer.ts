import { createReducer, on } from "@ngrx/store";
import { UserState, userAdapter } from "./User.state";
import { getuserssuccess } from "./User.action";

const _userReducer = createReducer(
    UserState,
    on(getuserssuccess, (state, { userlist }) => {
        return userAdapter.addMany(userlist, state);
      })
)

export function UserReducer(state:any, action: any) {
    return _userReducer(state,action)
}