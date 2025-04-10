import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const UserTokenReducer = createSlice({
    name: "accessToken",
    initialState: {
        token: ""
    },
    reducers: {
        setUserToken(state, action: PayloadAction<string>) {
            state.token = action.payload
        }
    }
})
export const { setUserToken } = UserTokenReducer.actions
export default UserTokenReducer.reducer