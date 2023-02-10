import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { getLocalStorage } from "../utilis";

export interface UserRedux {
  user: {
    id: number;
    username: string;
    email: string;
    avatar?: string | null;
    isAdmin: boolean;
    token: string;
  } | null;
}

export type User = {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
};

const initialState: UserRedux = {
  user: getLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login(state: UserRedux, action: PayloadAction<{ token: string }>) {
      try {
        if (action.payload) {
          let user: User = jwtDecode(action.payload.token);

          // console.log(user);

          state.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar || null,
            isAdmin: user.isAdmin,
            token: action.payload.token,
          };
        } else {
          console.log("cannot complete redux");
        }
      } catch (error) {
        console.log("error on reducer: Login", error);
      }
    },
    logOut(state: UserRedux) {
      try {
        state.user = null;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const { login, logOut } = userSlice.actions;
export default userSlice.reducer;
