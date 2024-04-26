import { createEntityAdapter } from "@ngrx/entity";
import { UserModel, Users } from "../Model/User.model";

// export const userAdapter = createEntityAdapter<Users>()
export const userAdapter = createEntityAdapter<Users>({
    selectId: (user: Users) => `${user.username}-${user.email}`
});


export const UserState:UserModel = userAdapter.getInitialState();