import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const AccountCreationReducer = createSlice({
  name: "accountCreation",
  initialState: {
    accountCreation: {}
  },
  reducers: {
    setAccountCreation(state, action: PayloadAction<any>) {
      state.accountCreation = action.payload
    }
  }
})
export const { setAccountCreation } = AccountCreationReducer.actions
export default AccountCreationReducer.reducer