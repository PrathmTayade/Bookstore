import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER + "/login",
        { email, password }
      );
      // store user's token in local storage
      localStorage.setItem("userToken", data.access_token);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
