import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const UserProfileReducer = createSlice({
  name: "userProfile",
  initialState: {
    userProfile: {}
  },
  reducers: {
    setUserProfile(state, action: PayloadAction<string>) {
      state.userProfile = action.payload
    }
  }
})
export const { setUserProfile } = UserProfileReducer.actions
export default UserProfileReducer.reducer