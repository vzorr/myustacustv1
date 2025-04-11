import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const PostJobReducer = createSlice({
  name: "postJob",
  initialState: {
    postJob: {}
  },
  reducers: {
    setPostJobReducer(state, action: PayloadAction<any>) {
      state.postJob = action.payload
    }
  }
})
export const { setPostJobReducer } = PostJobReducer.actions
export default PostJobReducer.reducer