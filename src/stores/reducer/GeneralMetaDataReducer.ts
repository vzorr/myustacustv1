import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const GeneralMetaDataReducer = createSlice({
    name: "metaData",
    initialState: {
       metaData: {}
    },
    reducers: {
        setMetaData(state, action: PayloadAction<string>) {
            state.metaData = action.payload
        }
    }
})
export const { setMetaData } = GeneralMetaDataReducer.actions
export default GeneralMetaDataReducer.reducer