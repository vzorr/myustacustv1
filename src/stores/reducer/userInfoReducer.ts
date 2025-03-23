import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const userInfoReducer = createSlice({
  name: "userInfo",
  initialState: {
    userData: {}
  },
  reducers: {
    setUserInfo(state, action: PayloadAction<string>) {
      state.userData = action.payload
    }
  }
})
export const { setUserInfo } = userInfoReducer.actions
export default userInfoReducer.reducer