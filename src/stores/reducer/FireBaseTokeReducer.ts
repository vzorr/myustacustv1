import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const FireBaseTokeReducer = createSlice({
    name: "fireBaseToken",
    initialState: {
        fireBaseToken: ""
    },
    reducers: {
        setFireBaseToken(state, action: PayloadAction<string>) {
            state.fireBaseToken = action.payload
        }
    }
})
export const { setFireBaseToken } = FireBaseTokeReducer.actions
export default FireBaseTokeReducer.reducer