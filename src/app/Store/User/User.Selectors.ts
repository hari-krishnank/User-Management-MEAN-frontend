import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../Model/User.model";
import { userAdapter } from "./User.state";

const getUserState = createFeatureSelector<UserModel>('user');

const userselector = userAdapter.getSelectors();

export const getuserlist = createSelector(getUserState, userselector.selectAll)
