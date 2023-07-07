import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "Service/Axios/instance";

interface ResponseAPI {
  response:any
}
const initialState: ResponseAPI = {
  response:[]
}
const url = "/TableListExample";
export const fetchUserById = createAsyncThunk('response', async () => {
  const res = await Axios.get(url)
  return res
});
export const responseApiSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
  },
  extraReducers:(builder)=> {
    builder.addCase(fetchUserById.fulfilled,(state,{payload})=>{
      state.response = payload
    }) 
  }
});

// export const { call } = taskSlice.actions;
export const responseAPI = (state: any) => state;
export default responseApiSlice.reducer;
